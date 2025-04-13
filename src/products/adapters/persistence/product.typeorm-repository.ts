import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from './product.model';
// import { ProductModel } from '../entities/product.model';

@Injectable()
export class ProductTypeOrmRepository {
    constructor(
        @InjectRepository(ProductModel)
        private readonly productRepository: Repository<ProductModel>, // Esto debe inyectar el repositorio de ProductModel
    ) { }

    async create(product: ProductModel): Promise<ProductModel> {
        return this.productRepository.save(product);
    }

    async findAll(): Promise<ProductModel[]> {
        return this.productRepository.find();
    }

    async findById(id: string): Promise<ProductModel | null> {
        return this.productRepository.findOne({ where: { id } });
    }
}
