import { Person } from "../ports/person.entity";
import { PersonRepository } from "../ports/person.repository";

export class PersonCaseUse {
  constructor(private readonly personRepository: PersonRepository) {}

  async createPerson(person: Person): Promise<Person> {
    return this.personRepository.create(person);
  }

  async getAllPersons(): Promise<Person[]> {
    return this.personRepository.findAll();
  }

  async getPersonById(id: string): Promise<Person | null> {
    return this.personRepository.findById(id);
  }

  async updatePerson(id: string, person: Person): Promise<Person | null> {
    return this.personRepository.update(id, person);
  }
}