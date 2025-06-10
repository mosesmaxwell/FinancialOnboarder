import { paymentTransactions, type PaymentTransaction, type InsertPaymentTransaction } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
  createPaymentTransaction(transaction: InsertPaymentTransaction): Promise<PaymentTransaction>;
  getPaymentTransaction(transactionId: string): Promise<PaymentTransaction | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, any>;
  private paymentTransactions: Map<string, PaymentTransaction>;
  currentUserId: number;
  currentTransactionId: number;

  constructor() {
    this.users = new Map();
    this.paymentTransactions = new Map();
    this.currentUserId = 1;
    this.currentTransactionId = 1;
  }

  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createPaymentTransaction(insertTransaction: InsertPaymentTransaction): Promise<PaymentTransaction> {
    const transactionId = `TXN-2024-${Date.now()}${this.currentTransactionId++}`;
    const processingFee = 3.50;
    const tax = parseFloat(insertTransaction.premiumAmount) * 0.01; // 1% tax
    const totalAmount = parseFloat(insertTransaction.premiumAmount) + processingFee + tax;

    const transaction: PaymentTransaction = {
      id: this.currentTransactionId,
      transactionId,
      ...insertTransaction,
      processingFee: processingFee.toString(),
      tax: tax.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      status: "completed",
      createdAt: new Date(),
    };

    this.paymentTransactions.set(transactionId, transaction);
    return transaction;
  }

  async getPaymentTransaction(transactionId: string): Promise<PaymentTransaction | undefined> {
    return this.paymentTransactions.get(transactionId);
  }
}

export const storage = new MemStorage();
