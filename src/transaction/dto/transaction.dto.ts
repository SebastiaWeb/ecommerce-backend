import { ApiProperty } from "@nestjs/swagger";

export class TransactionDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    userId: string;

    @ApiProperty()
    amount: number;

    @ApiProperty()
    currency: string;

    @ApiProperty()
    status: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    paymentMethod: string;

    @ApiProperty()
    transactionId: string;

    @ApiProperty()
    orderId: string;

    @ApiProperty({ required: false })
    errorMessage?: string;

    @ApiProperty({ required: false })
    errorCode?: string;

    @ApiProperty({ required: false })
    metadata?: Record<string, any>;

    @ApiProperty({ required: false })
    paymentDetails: {
        cardNumber: string;
        cardHolder: string;
        expirationDate: string;
        cvv: string;
    };

    @ApiProperty({ required: false })
    paymentStatus?: string;

    @ApiProperty({ required: false })
    paymentMethodId?: string;

    @ApiProperty({ required: true })
    email: string;
}