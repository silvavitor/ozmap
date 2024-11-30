import {
  IUserRepository,
  UserRepositoryCreateParams,
  UserRepositoryFindParams,
  UserRepositoryUpdateParams,
} from "../interfaces/userRepository.interface";
import { User } from "../models/user.model";

export class UserRepository implements IUserRepository {
  async update(
    id: string,
    updateUser: UserRepositoryUpdateParams
  ): Promise<User> {
    const user = new User({
      id: "id",
      name: "name",
      email: "email",
      coordinates: {
        latitude: 1,
        longitude: 2,
      },
      address: {
        street: "Flower Street",
        number: 123,
        neighborhood: "Spring Garden",
        state: "NY",
        zipCode: "12345-678",
        country: "USA",
      },
    });
    return user;
  }

  async find(filter: UserRepositoryFindParams): Promise<User[]> {
    const users = [
      new User({
        id: "id",
        name: "name",
        email: "email",
        coordinates: {
          latitude: 1,
          longitude: 2,
        },
        address: {
          street: "Flower Street",
          number: 123,
          neighborhood: "Spring Garden",
          state: "NY",
          zipCode: "12345-678",
          country: "USA",
        },
      }),
      new User({
        id: "id",
        name: "name",
        email: "email",
        coordinates: {
          latitude: 1,
          longitude: 2,
        },
        address: {
          street: "Flower Street",
          number: 123,
          neighborhood: "Spring Garden",
          state: "NY",
          zipCode: "12345-678",
          country: "USA",
        },
      }),
    ];

    return users;
  }

  async create(createUser: UserRepositoryCreateParams): Promise<User> {
    const user = new User({
      id: "id",
      name: createUser.name,
      email: createUser.email,
      coordinates: createUser.coordinates,
      address: createUser.address,
    });
    return user;
  }

  async findById(id: string): Promise<User> {
    return new User();
  }

  async findByEmail(email: string): Promise<User> {
    return null;
  }

  delete(id: string): Promise<void> {
    return;
  }
}
