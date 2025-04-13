import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertProducts1623456789012 implements MigrationInterface {
  name = 'InsertProducts1623456789012';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "products" (
        "id", 
        "name", 
        "description", 
        "price", 
        "category", 
        "stock", 
        "createdAt", 
        "updatedAt", 
        "imageUrl", 
        "isActive"
      ) VALUES 
      (
        uuid_generate_v4(), 
        'Laptop Pro', 
        'Potente laptop con 16GB RAM y SSD 512GB', 
        1299.99, 
        'Electrónicos', 
        50, 
        NOW(), 
        NOW(), 
        'https://example.com/laptop.jpg', 
        true
      ),
      (
        uuid_generate_v4(), 
        'Smartphone X', 
        'Teléfono inteligente con cámara de 48MP', 
        799.99, 
        'Electrónicos', 
        100, 
        NOW(), 
        NOW(), 
        'https://example.com/phone.jpg', 
        true
      ),
      (
        uuid_generate_v4(), 
        'Auriculares Inalámbricos', 
        'Auriculares con cancelación de ruido', 
        199.99, 
        'Accesorios', 
        75, 
        NOW(), 
        NOW(), 
        'https://example.com/headphones.jpg', 
        true
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "products" WHERE "name" IN ('Laptop Pro', 'Smartphone X', 'Auriculares Inalámbricos')`);
  }
}
