import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class ProductModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("decimal")
    price: number;

    @Column()
    category: string;

    @Column("int")
    stock: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @Column()
    imageUrl: string;

    @Column({ default: true })
    isActive: boolean;
}