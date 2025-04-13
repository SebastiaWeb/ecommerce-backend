import { Injectable } from "@nestjs/common";
import { PersonRepository } from "../ports/person.repository";
import { Person } from "../ports/person.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonModel } from "./persistence/person.model";
import { Repository } from "typeorm";

@Injectable()
export class PersonService implements PersonRepository {
    constructor(
        @InjectRepository(PersonModel)
    private readonly personRepository: Repository<PersonModel>,
    ) { }

    async create(person: Person): Promise<Person> {
        const newPerson = this.personRepository.create(person);
        return this.personRepository.save(newPerson);
    }

    async findAll(): Promise<Person[]> {
        return this.personRepository.find();
    }

    async findById(id: string): Promise<Person | null> {
        return this.personRepository.findOne({ where: { id } });
    }

    async update(id: string, person: Person): Promise<Person | null> {
        await this.personRepository.update(id, person);
        return this.findById(id);
    }
}
