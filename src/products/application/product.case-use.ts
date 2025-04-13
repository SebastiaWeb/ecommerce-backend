import { Product } from "../ports/product.entity";
import { ProductRepository } from "../ports/product.repository";

export class ProductCaseUse {
    constructor(private readonly productRepository: ProductRepository) {}

    async getAllProducts(): Promise<Product[]> {
        return this.productRepository.findAll();
    }

    async getProductById(id: string): Promise<Product | null> {
        return this.productRepository.findById(id);
    }

    async createProduct(product: Product): Promise<Product> {
        return this.productRepository.create(product);
    }

    async updateProduct(id: string, product: Product): Promise<Product | null> {
        return this.productRepository.update(id, product);
    }

    async deleteProduct(id: string): Promise<void> {
        return this.productRepository.delete(id);
    }
}