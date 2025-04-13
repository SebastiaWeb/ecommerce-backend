import { PersonModel } from "./person.model";

export class PersonTypeOrmRepository {
  constructor(private readonly personModel: any) {} // Replace 'any' with the actual type of your ORM model

  async findAll(): Promise<any[]> { // Replace 'any' with the actual type
    return this.personModel.find();
  }

  async findById(id: string): Promise<any | null> { // Replace 'any' with the actual type
    return this.personModel.findOne({ where: { id } });
  }

  async create(person: PersonModel): Promise<PersonModel> { // Replace 'any' with the actual type
    return this.personModel.create(person);
  }

  async update(id: string, person: PersonModel): Promise<PersonModel | null> { // Replace 'any' with the actual type
    await this.personModel.update(id, person);
    return this.findById(id);
  }
}