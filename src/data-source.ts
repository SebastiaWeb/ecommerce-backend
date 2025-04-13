import { DataSource } from 'typeorm';
// import { ProductModel } from './entities/ProductModel'; // Ajusta la ruta según tu estructura
// import { InsertProducts } from './migrations/InsertProducts'; // Ruta a tus migraciones
import { ProductModel } from './products/adapters/persistence/product.model';
import { InsertProducts1623456789012 } from './migrations/InsertProducts';

export const AppDataSource = new DataSource({
  type: 'postgres', // Tipo de base de datos (en este caso PostgreSQL)
  host: process.env.POSTGRES_HOST, // Dirección del host de tu base de datos
  port: parseInt(process.env.POSTGRES_PORT || '5432'), // Puerto de la base de datos (5432 por defecto para PostgreSQL)
  username: process.env.POSTGRES_USER, // Usuario de la base de datos
  password: process.env.POSTGRES_PASSWORD, // Contraseña de la base de datos
  database: process.env.POSTGRES_DATABASE, // Nombre de la base de datos
  synchronize: false, // En producción no lo recomendamos, se usa para sincronizar el esquema automáticamente
  logging: true, // Permite ver las consultas SQL en la consola
  entities: [ProductModel], // Entidades que vas a utilizar
  migrations: [InsertProducts1623456789012], // Tus migraciones
  subscribers: [], // Si tienes suscriptores, los agregas aquí
});

