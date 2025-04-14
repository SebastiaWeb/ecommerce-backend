import { Transaction } from "./transaction.entity";

export abstract class TransactionRepository {
  abstract createTransaction(transaction: Transaction): Promise<Transaction>;
  abstract getTransactionById(id: string): Promise<Transaction | null>;
  abstract updateTransaction(transaction: Transaction): Promise<Transaction | null>;
}
