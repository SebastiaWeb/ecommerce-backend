import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { PersonService } from "./person.service";
import { PersonDto } from "../dto/person.dto";
import { Person } from "../ports/person.entity";

@ApiTags('Person')
@Controller('person')
@ApiBearerAuth("JWT-auth")  // Añade esto para indicar que todas las rutas requieren un token JWT
export class PersonController {
    constructor(private readonly personService: PersonService) { }

    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @ApiResponse({ status: 200, description: 'List of person', type: [PersonDto] })
    async getAllPersons() {
        return this.personService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get person by ID' })
    @ApiResponse({ status: 200, description: 'Person found', type: PersonDto })
    @ApiResponse({ status: 404, description: 'Person not found' })
    async getPersonById(@Param('id') id: string) {
        return this.personService.findById(id);
    }
    @Post()
    @ApiOperation({ summary: 'Create a new person' })
    @ApiBody({ 
      type: PersonDto, // Swagger usará los ejemplos definidos en el DTO
      description: 'Person data to create'
    })
    @ApiResponse({ 
      status: 201, 
      description: 'Person created successfully',
      type: PersonDto 
    })
    @ApiResponse({ 
      status: 400, 
      description: 'Invalid input data' 
    })
    async createPerson(@Body() person: PersonDto) {
      return this.personService.create(person);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update person by ID' })
    @ApiResponse({ status: 200, description: 'Person updated', type: PersonDto })
    @ApiResponse({ status: 404, description: 'Person not found' })
    async updatePerson(@Param('id') id: string, @Body() person: Person) {
        return this.personService.update(id, person);
    }
}