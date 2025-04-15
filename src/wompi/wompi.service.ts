import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { wompiConfig } from './wompi.config';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import * as crypto from 'crypto';

@Injectable()
export class WompiService {
  constructor(private readonly httpService: HttpService) { }

  async createPaymentSource(paymentData: any): Promise<any> {
    const url = `${wompiConfig.baseUrl}/payment_sources`;
    const response$ = this.httpService.post(url, paymentData, {
      headers: {
        'Authorization': `Bearer ${wompiConfig.privateKey}`,
      },
    });
    const response = await lastValueFrom(response$);
    return response.data;
  }

  async createTransaction(wompiTransactionData: any): Promise<any> {
    try {
      const url = `${wompiConfig.baseUrl}/transactions`;
      const response1 = this.httpService.post(url, wompiTransactionData, {
        headers: {
          'Authorization': `Bearer ${wompiConfig.privateKey}`
        },
      });
      const response = await lastValueFrom(response1);

      return response;
      // return response.data.error.message; // Manejo de errores mejorado

    } catch (error) {
      console.log("Este es el error:", error);
    }
  }

  async tokenizeCard(cardDetails: {
    number: string;  // Nota: Cambiado a "number" según documentación Wompi
    exp_month: string;
    exp_year: string;
    cvc: string;
    card_holder?: string;
  }): Promise<any> {
    const url = `${wompiConfig.baseUrl}/tokens/cards`;

    try {
      const payload = {
        number: cardDetails.number,
        exp_month: cardDetails.exp_month,
        exp_year: cardDetails.exp_year,
        cvc: cardDetails.cvc,
        card_holder: cardDetails.card_holder || "Test Cardholder" // Valor por defecto

      };

      console.debug(`Tokenizing card with payload: ${JSON.stringify(payload)}`, url);

      const response = await firstValueFrom(
        this.httpService.post(url, payload, {
          headers: {
            'Authorization': `Bearer ${wompiConfig.publicKey}`,
            'Content-Type': 'application/json',
          },
        })
      );

      console.log('Card tokenized successfully');
      return response.data;

    } catch (error) {
      console.error('Failed to tokenize card', {
        error: error.response?.data || error.message,
        stack: error.stack
      });

      throw new Error(
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        'Failed to tokenize card'
      );
    }
  }

  async getAcceptanceToken() {
    const url = `${wompiConfig.baseUrl}/merchants/${wompiConfig.publicKey}`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );

    const { data } = response.data;

    return data.presigned_acceptance.acceptance_token;

  }

  async generateWompiSignature(
    reference: string,
    amount_in_cents: number,
    currency: string,
    timestamp: string, // Puede ser ISO string o UNIX timestamp (segundos)
    integritySecret: string
  ) {
    // 1. Validar parámetros
    if (!reference || !amount_in_cents || !currency || !timestamp || !integritySecret) {
      throw new Error("Todos los parámetros son requeridos");
    }

    // 2. Asegurar formato correcto del monto
    const amount = Math.round(amount_in_cents);
    const formattedCurrency = currency.toUpperCase();

    // 3. Convertir timestamp a formato ISO correctamente
    let formattedTimestamp;
    if (/^\d+$/.test(timestamp)) {
      // Si es un timestamp UNIX (segundos)
      formattedTimestamp = new Date(parseInt(timestamp) * 1000).toISOString();
    } else {
      // Si ya es una cadena ISO
      formattedTimestamp = new Date(timestamp).toISOString();
    }

    // 4. Concatenar en el ORDEN EXACTO requerido
    const concatenatedData = `${reference}${amount}${formattedCurrency}${integritySecret}`;

    const encondedText = new TextEncoder().encode(concatenatedData);
    const hashBuffer = await crypto.subtle.digest("SHA-256", encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    console.log("Datos concatenados CORRECTOS:", concatenatedData);
    return hashHex;
    // 5. Generar hash SHA-256
    return crypto
      .createHash('sha256')
      .update(concatenatedData)
      .digest('hex')
      .toLowerCase();
  }
}