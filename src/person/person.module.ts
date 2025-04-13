import { Module } from "@nestjs/common";
import { PersonModel } from "./adapters/persistence/person.model";
import { PersonController } from "./adapters/person.controller";
import { PersonRepository } from "./ports/person.repository";
import { PersonTypeOrmRepository } from "./adapters/persistence/person.repositories";
import { PersonService } from "./adapters/person.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([PersonModel]),  // Registra la entidad Product en TypeOrmModule
  ],
  controllers: [PersonController],
  providers: [
    {
      provide: PersonRepository,
      useClass: PersonTypeOrmRepository,  // Vincula la interfaz con la implementación
    },
    PersonService,  // Asegúrate de que el ProductService está disponible
    JwtAuthGuard
  ],
})
export class PersonModule { }