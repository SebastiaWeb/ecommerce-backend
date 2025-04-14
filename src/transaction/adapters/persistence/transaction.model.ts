import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TransactionModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    userId: string;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column()
    status: string;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column()
    paymentMethod: string;

    @Column()
    transactionId: string;
    
    @Column()
    orderId: string;

    @Column({ nullable: true })
    errorMessage?: string;

    @Column({ nullable: true })
    errorCode?: string;

    @Column({ type: "json", nullable: true })
    metadata?: Record<string, any>;

    @Column({ type: "json", nullable: true })
    paymentDetails: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
    };

    @Column({ nullable: true })
    paymentStatus?: string;

    @Column({ nullable: true })
    paymentMethodId?: string;

    @Column({ nullable: true })
    email: string;
}