import './polyfills'; // 👈 Importa esto primero
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/product.module';
import { PersonModule } from './person/person.module';
import { TransactionModule } from './transaction/transaction.module';
// import { InsertProducts } from './migrations/InsertProducts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT||'5432'), // Asegúrate de que esto sea un número
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD, // Asegúrate de que esta sea una cadena
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,  // Solo en desarrollo
      //logging: true, // Para depuración
      entities: ['dist/**/*.model{.ts,.js}'],
      // migrations: [InsertProducts1623456789012],
      // entities: [ProductModel], // Asegúrate de que esto apunte a tus entidades
    }),
    AuthModule,
    ProductModule,
    PersonModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }
  ],
})
export class AppModule {}
