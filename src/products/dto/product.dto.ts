import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @ApiProperty({
    description: 'Unique identifier for the product',
    example: 'f6c9e85b-6f90-4e1f-9f3f-906c106bf111',
  })
  id: string;

  @ApiProperty({
    description: 'Name of the product',
    example: 'Product Name',
  })
  name: string;

  @ApiProperty({
    description: 'Description of the product',
    example: 'A detailed description of the product.',
  })
  description: string;

  @ApiProperty({
    description: 'Price of the product',
    example: 29.99,
  })
  price: number;

  @ApiProperty({
    description: 'Category of the product',
    example: 'Electronics',
  })
  category: string;

  @ApiProperty({
    description: 'Stock quantity available',
    example: 100,
  })
  stock: number;

  @ApiProperty({
    description: 'URL for the product image',
    example: 'https://example.com/image.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'Whether the product is active',
    example: true,
  })
  isActive: boolean;

  // Agregar estos campos si quieres incluirlos en el DTO, pero generalmente no son necesarios para el cliente
  @ApiProperty({
    description: 'Timestamp when the product was created',
    example: '2025-04-13T00:00:00.000Z',
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the product was last updated',
    example: '2025-04-13T00:00:00.000Z',
    required: false,
  })
  updatedAt: Date;
}