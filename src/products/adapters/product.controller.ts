import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { ProductService } from "./product.service";
import { ProductDto } from "src/products/dto/product.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";

@ApiTags('Products')
@Controller('products')
@ApiBearerAuth("JWT-auth")  // Añade esto para indicar que todas las rutas requieren un token JWT
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    // Obtener todos los productos
    @Get()
    @ApiOperation({ summary: 'Get all products' })
    @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard
    @ApiResponse({ status: 200, description: 'List of products', type: [ProductDto] })
    async getAllProducts(): Promise<ProductDto[]> {
        return this.productService.getProducts();
    }

    // Obtener un producto por su ID
    @Get(':id')
    @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard
    @ApiOperation({ summary: 'Get product by ID' })
    @ApiResponse({ status: 200, description: 'Product found', type: ProductDto })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async getProductById(@Param('id') id: string): Promise<ProductDto | null> {
        return this.productService.getProductById(id);
    }

    // Crear un nuevo producto
    @Post()
    @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard
    @ApiOperation({ summary: 'Create a new product' })
    @ApiResponse({ status: 201, description: 'Product created', type: ProductDto })
    async createProduct(@Body() product: ProductDto): Promise<ProductDto> {
        return this.productService.createProduct(product);
    }

    // Actualizar un producto
    @Put(':id')
    @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard
    @ApiOperation({ summary: 'Update product by ID' })
    @ApiResponse({ status: 200, description: 'Product updated', type: ProductDto })
    @ApiResponse({ status: 404, description: 'Product not found' })
    async updateProduct(
        @Param('id') id: string,
        @Body() product: ProductDto
    ): Promise<ProductDto | null> {
        return this.productService.updateProduct(id, product);
    }

    // Eliminar un producto
    @Delete(':id')
    @UseGuards(JwtAuthGuard)  // Protege la ruta con el guard
    @ApiOperation({ summary: 'Delete product by ID' })
    @ApiResponse({ status: 200, description: 'Product deleted' })
    @ApiResponse({ status: 404, description: 'Product not found' })
    @ApiBearerAuth()  // Indica que la ruta requiere autenticación
    async deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productService.deleteProduct(id);
    }
}