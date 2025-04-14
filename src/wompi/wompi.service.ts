import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { wompiConfig } from './wompi.config';
import { firstValueFrom, lastValueFrom } from 'rxjs';

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
    const url = `${wompiConfig.baseUrl}/transactions`;
    const response1 = this.httpService.post(url, wompiTransactionData, {
      headers: {
        'Authorization': `Bearer ${wompiConfig.privateKey}`,
      },
    });
    const response = await lastValueFrom(response1);
    return response.data.error.message; // Manejo de errores mejorado
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
}