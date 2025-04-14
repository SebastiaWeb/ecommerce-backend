// src/transaction/adapters/transaction.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionModel } from './persistence/transaction.model';
import { TransactionRepository } from '../ports/transaction.repository';
import { Transaction } from '../ports/transaction.entity';

@Injectable()
export class TransactionService implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionModel)
    private readonly transactionRepository: Repository<TransactionModel>,
  ) {}

  async createTransaction(transaction: Transaction): Promise<Transaction> {
    console.log('TransactionService - createTransaction', transaction);
    const newTransaction = this.transactionRepository.create(transaction);
    return this.transactionRepository.save(newTransaction);
  }

  async getTransactionById(id: string): Promise<Transaction | null> {
    return this.transactionRepository.findOne({ where: { id } });
  }

  async updateTransaction(transaction: Transaction): Promise<Transaction | null> {
    await this.transactionRepository.update(transaction.id, transaction);
    return this.getTransactionById(transaction.id);
  }
}