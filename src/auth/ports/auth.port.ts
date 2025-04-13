export const AUTH_PORT = 'AUTH_PORT'; // Token de inyección

export interface AuthPort {
  validateCredentials(username: string, password: string): Promise<boolean>;
  generateToken(payload: any): string;
}