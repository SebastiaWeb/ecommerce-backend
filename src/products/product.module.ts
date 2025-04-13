import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductTypeOrmRepository } from "./adapters/persistence/product.typeorm-repository";  // Implementación de repositorio
import { ProductRepository } from "./ports/product.repository";  // Interfaz del repositorio
import { ProductModel } from "./adapters/persistence/product.model";  // Tu entidad Product
import { ProductController } from "./adapters/product.controller";
import { ProductService } from "./adapters/product.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductModel]),  // Registra la entidad Product en TypeOrmModule
  ],
  controllers: [ProductController],
  providers: [
    {
      provide: ProductRepository,
      useClass: ProductTypeOrmRepository,  // Vincula la interfaz con la implementación
    },
    ProductService,  // Asegúrate de que el ProductService está disponible
    JwtAuthGuard
  ],
})
export class ProductModule {}
