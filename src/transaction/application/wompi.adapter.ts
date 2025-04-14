import { Injectable } from '@nestjs/common';
import { WompiService } from '../../wompi/wompi.service';
import { TransactionDto } from '../dto/transaction.dto';

@Injectable()
export class WompiAdapter {
  constructor(private readonly wompiService: WompiService) {}

  async processWithWompi(transaction: TransactionDto, tokenizeCard: any) {
    const wompiData = this.mapToWompiFormat(transaction, tokenizeCard);
  
    const response = await this.wompiService.createTransaction(wompiData);

    if (response.status !== 200 || response.data.status !== 'APPROVED') {
      throw new Error(`Wompi error: ${response.data.error || 'Unknown error'}`);
    }

    return response.data;
  }

  private mapToWompiFormat(transaction: TransactionDto, tokenizeCard: any) {
    console.log('Mapping transaction to Wompi format:', transaction, tokenizeCard);
    return {
      amount_in_cents: transaction.amount * 100, // Asegúrate de multiplicar por 100
      currency: transaction.currency || 'COP', // Si no se pasa la divisa, se asume COP
      customer_email: transaction.email,
      payment_method: {
        type: 'CARD', // Siempre será 'CARD' si usas tarjeta
        token: tokenizeCard, // El token obtenido al tokenizar la tarjeta
      },
      reference: transaction.orderId,
    };
  }
}
