import { User } from '../models/user.model';

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  // Otros métodos del repositorio...
}