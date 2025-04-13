import { ApiProperty } from "@nestjs/swagger";

export class PersonDto {
  @ApiProperty({
    description: 'Unique identifier for the person',
    example: 'f6c9e85b-6f90-4e1f-9f3f-906c106bf111',
    required: false // Opcional si el ID es autogenerado
  })
  id: string;

  @ApiProperty({
    description: 'First name of the person',
    example: 'John',
    required: true
  })
  firstName: string;

  @ApiProperty({
    description: 'Last name of the person',
    example: 'Doe',
    required: true
  })
  lastName: string;

  @ApiProperty({
    description: 'Email address of the person',
    example: 'john@example.com',
    format: 'email'
  })
  email: string;

  @ApiProperty({
    description: 'Phone number of the person',
    example: '+1234567890',
    pattern: '^\\+[0-9]{10,15}$' // Ejemplo de validación
  })
  phone: string;

  @ApiProperty({
    description: 'Address of the person',
    example: '123 Main St, City, Country'
  })
  address: string;

    @ApiProperty({
        description: 'Creation date of the person record',
        example: '2023-10-01T12:00:00Z',
        type: String,
        format: 'date-time'
    })
    createdAt: Date;
}