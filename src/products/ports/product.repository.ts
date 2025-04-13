import { Product } from "./product.entity";

export abstract class ProductRepository {  // Interfaz del puerto
    abstract findAll(): Promise<Product[]>;
    abstract findById(id: string): Promise<Product | null>;
    abstract create(product: Product): Promise<Product>;
    abstract update(id: string, product: Product): Promise<Product | null>;
    abstract delete(id: string): Promise<void>;
}