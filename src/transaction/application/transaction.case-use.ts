import { Injectable } from '@nestjs/common';
import { TransactionRepository } from "../ports/transaction.repository";
import { WompiAdapter } from "./wompi.adapter";
// import { WompiService } from './wompi.service'; // Asegúrate de importar el servicio de Wompi
import { Transaction } from "../ports/transaction.entity";
import { WompiService } from 'src/wompi/wompi.service';

@Injectable()
export class TransactionCaseUse {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly wompiAdapter: WompiAdapter,
        private readonly wompiService: WompiService, // Inyecta el servicio de Wompi
    ) { }

    async createTransaction(transaction: Transaction): Promise<Transaction> {
        // 1. Tokenizar la tarjeta antes de crear la transacción
        let tokenizedCard = await this.wompiService.tokenizeCard({
            number: transaction.paymentDetails.cardNumber || '',
            exp_month: transaction.paymentDetails.expirationDate?.split('/')[0] || '', // Asumiendo que el formato es MM/YY
            exp_year: transaction.paymentDetails.expirationDate?.split('/')[1] || '',
            cvc: transaction.paymentDetails.cvv ,

        });

        // 2. Asegúrate de que el token esté disponible
        if (!tokenizedCard || !tokenizedCard) {
            throw new Error('Error al tokenizar la tarjeta');
        }else{
            tokenizedCard = tokenizedCard.data.id; // Asigna el token a la variable
        }

        // 3. Procesar la transacción con Wompi usando el token obtenido
        // transaction.paymentMethodId = tokenizedCard; // Guarda el token

        const wompiResponse = await this.wompiAdapter.processWithWompi(transaction, tokenizedCard);

        // 4. Actualizar datos de la transacción con la respuesta de Wompi
        transaction.transactionId = wompiResponse.id;
        transaction.status = wompiResponse.status;
        transaction.paymentDetails = wompiResponse;

        // 5. Guardar en base de datos
        return this.transactionRepository.createTransaction(transaction);
    }

    async getTransactionById(id: string): Promise<Transaction | null> {
        return this.transactionRepository.getTransactionById(id);
    }

    async updateTransaction(transaction: Transaction): Promise<Transaction | null> {
        return this.transactionRepository.updateTransaction(transaction);
    }
}
