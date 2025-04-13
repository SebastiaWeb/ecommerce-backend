import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("person")
export class PersonModel {
        @PrimaryGeneratedColumn("uuid")
        id: string;

        @Column()
        firstName: string;

        @Column()
        lastName: string;

        @Column()
        email: string;

        @Column()
        phone: string;

        @Column()
        address: string;

        @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
        createdAt: Date;
}