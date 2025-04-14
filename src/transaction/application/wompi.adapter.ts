import { Injectable } from '@nestjs/common';
import { WompiService } from '../../wompi/wompi.service';
import { Transaction } from '../ports/transaction.entity';
import { wompiConfig } from 'src/wompi/wompi.config';
import { randomUUID } from 'crypto';
import { SHA256 } from 'crypto-js';

@Injectable()
export class WompiAdapter {
  constructor(private readonly wompiService: WompiService) {}

  async processWithWompi(transaction: Transaction, tokenizeCard: any) {
    const wompiData = await this.mapToWompiFormat(transaction, tokenizeCard);

    const response = await this.wompiService.createTransaction(wompiData);
    console.log("response:", response.data);
    
    if (response.status !== 200 || response.data.status !== 'APPROVED') {
      throw new Error(`Wompi error: ${response.data.error || 'Unknown error'}`);
    }

    return response.data;
  }

  async mapToWompiFormat(transaction: Transaction, tokenizeCard: any) {
    const acceptance_token = await this.wompiService.getAcceptanceToken();
    // const signature = this.wompiService.generateWompiSignature(randomUUID(), wompiConfig.privateKey, transaction);
    const amount_in_cents = transaction.amount * 100;
    const timestampString = Math.floor(Date.now() / 1000).toString();
    const checksum = this.wompiService.generateWompiChecksum(
      transaction.id,
      transaction.status,
      amount_in_cents,
      timestampString,
      wompiConfig.publicKey
    );
    return {
      amount_in_cents: amount_in_cents, // Asegúrate de multiplicar por 100
      currency: 'COP', // Si no se pasa la divisa, se asume COP
      signature: checksum, // Asegúrate de que es un string
      customer_email: transaction.email,
      payment_method: {
        type: 'CARD', // Siempre será 'CARD' si usas tarjeta
        installments: 2,
        token: tokenizeCard, // El token obtenido al tokenizar la tarjeta
      },
      reference: transaction.orderId,
      acceptance_token: acceptance_token
    };
  }
}
