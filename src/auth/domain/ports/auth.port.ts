import { User } from "../models/user.model";

export interface AuthPort {
    validateUser(email: string, password: string): Promise<User | null>;
    generateToken(user: User): Promise<string>;
    verifyToken(token: string): Promise<User>;
  }