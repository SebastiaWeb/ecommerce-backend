import { Person } from "./person.entity";

export abstract class PersonRepository {  // Interfaz del puerto
    abstract findAll(): Promise<Person[]>;  // Método para obtener todas las personas
    abstract findById(id: string): Promise<Person | null>;  // Método para obtener una persona por ID
    abstract create(person: Person): Promise<Person>;  // Método para crear una nueva persona
    abstract update(id: string, person: Person): Promise<Person | null>;  // Método para actualizar una persona
}