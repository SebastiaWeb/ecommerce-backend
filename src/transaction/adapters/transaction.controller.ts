import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { TransactionService } from "./transaction.service";
import { TransactionDto } from "../dto/transaction.dto";
import { TransactionCaseUse } from "../application/transaction.case-use";
import { Transaction } from "../ports/transaction.entity";

@ApiTags("transaction")
@Controller("transaction")
@ApiBearerAuth("JWT-auth") // Añade esto para indicar que todas las rutas requieren un token JWT
export class TransactionController {

    constructor(private readonly transactionService: TransactionService, private readonly transactionUseCase: TransactionCaseUse) { }

    // En tu TransactionController
    @Post()
    @ApiOperation({ summary: 'Create transaction via Wompi' })
    @ApiResponse({
        status: 201,
        description: 'Transaction created and processed by Wompi',
        type: TransactionDto
    })
    @ApiResponse({
        status: 402,
        description: 'Wompi payment failed'
    })
    async createTransaction(@Body() transaction: Transaction) {
        //console.log("Transaction data:", transaction);
        return this.transactionUseCase.createTransaction(transaction);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get transaction by ID' })
    @ApiResponse({ status: 200, description: 'Transaction found', type: TransactionDto })
    @ApiResponse({ status: 404, description: 'Transaction not found' })
    async getTransactionById(@Param('id') id: string): Promise<Transaction | null> {
        return this.transactionService.getTransactionById(id);
    }

}