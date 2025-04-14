import { Module } from "@nestjs/common";
import { TransactionModel } from "./adapters/persistence/transaction.model";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./adapters/transaction.controller";
import { TransactionRepositoryOrm } from "./adapters/persistence/transaction.repositories";
import { TransactionService } from "./adapters/transaction.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TransactionRepository } from "./ports/transaction.repository";
import { WompiAdapter } from "./application/wompi.adapter";
import { WompiService } from "src/wompi/wompi.service";
import { HttpModule } from "@nestjs/axios";
import { TransactionCaseUse } from "./application/transaction.case-use";

@Module({
  imports: [
    TypeOrmModule.forFeature([TransactionModel]),  // Registra la entidad Product en TypeOrmModule
    HttpModule
  ],
  controllers: [TransactionController],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryOrm,  // Vincula la interfaz con la implementación
    },
    TransactionService,
    TransactionCaseUse,  // Asegúrate de que el ProductService está disponible
    JwtAuthGuard,
    WompiAdapter,
    WompiService,
  ],
})

export class TransactionModule {}