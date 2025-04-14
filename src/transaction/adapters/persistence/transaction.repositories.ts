import { Repository, Transaction } from "typeorm";

export class TransactionRepositoryOrm {
    constructor(private transactionRepository: Repository<Transaction>) { }

    async createTransaction(
        transaction: Transaction,
    ): Promise<Transaction | null> {
        const transactionEntity = this.transactionRepository.create(transaction);
        const savedTransaction = await this.transactionRepository.save(
            transactionEntity,
        );
        return savedTransaction;
    }

    async getTransactionById(id: string): Promise<Transaction | null> {
        const transaction = await this.transactionRepository.findOneById(id);
        return transaction;
    }
}