export interface Transaction {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    paymentMethod: string;
    transactionId: string;
    orderId: string;
    errorMessage?: string;
    errorCode?: string;
    metadata?: Record<string, any>;
    paymentDetails: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
    };
    paymentStatus?: string;
    paymentMethodId?: string;
    email: string;
}