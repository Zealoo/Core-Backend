import { compare, hash } from 'bcrypt';

// hashing password
export const hashPassword = (password: string): Promise<string> => {
  return hash(password, 12);
};

// comparing password
export const comparePassword = (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return compare(password, hashedPassword);
};
