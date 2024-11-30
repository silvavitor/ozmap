import { IUserRepository } from "../interfaces/userRepository.interface";
import { User } from "../models/user.model";

export class UserRepository implements IUserRepository {
  async create(createUser: any): Promise<User> {
    const user = new User({
      id: "id",
      name: createUser.name,
      email: createUser.email,
      coordinates: createUser.coordinates,
      address: createUser.addres,
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    return new User();
  }

  async findByEmail(email: string): Promise<User> {
    return null;
  }
}
