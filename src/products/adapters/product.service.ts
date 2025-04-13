import { Injectable } from "@nestjs/common";
// import { Product } from "../ports/product.interface";  // Importa la interfaz Product
import { ProductRepository } from "../ports/product.repository";
import { Product } from "../ports/product.entity";

@Injectable()
export class ProductService {
    constructor(private readonly repository: ProductRepository) {}

    // Obtener todos los productos
    async getProducts(): Promise<Product[]> {
        return this.repository.findAll();
    }

    // Obtener un producto por su ID
    async getProductById(id: string): Promise<Product | null> {
        return this.repository.findById(id);
    }

    // Crear un nuevo producto
    async createProduct(product: Product): Promise<Product> {
        return this.repository.create(product);
    }

    // Actualizar un producto por su ID
    async updateProduct(id: string, product: Product): Promise<Product | null> {
        return this.repository.update(id, product);
    }

    // Eliminar un producto por su ID
    async deleteProduct(id: string): Promise<void> {
        return this.repository.delete(id);
    }
}
