import { User } from "../models/user.model";

export interface IUserRepository {
  create(createUser: any): Promise<User>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;
}
