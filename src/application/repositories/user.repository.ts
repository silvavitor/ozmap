import { UserDatabase } from "../../database/models/databaseUser.model";
import {
  IUserRepository,
  UserRepositoryCreateParams,
  UserRepositoryFindParams,
  UserRepositoryUpdateParams,
} from "../interfaces/userRepository.interface";
import { User } from "../models/user.model";
import { Page } from "../types/page.type";

export class UserRepository implements IUserRepository {
  async update(
    id: string,
    updateUser: UserRepositoryUpdateParams
  ): Promise<User> {
    const user = await UserDatabase.findByIdAndUpdate(
      id,
      { ...updateUser },
      { new: true }
    ).exec();
    return user ? User.fromDatabase(user) : null;
  }

  async findPaginated(filter: UserRepositoryFindParams): Promise<Page<User>> {
    const { limit, skip } = filter;

    const query: any = {};

    const users = await UserDatabase.find(query).skip(skip).limit(limit).exec();

    const total = await UserDatabase.countDocuments(query).exec();

    return {
      total,
      skip: skip,
      data: users.map((dbUser) => User.fromDatabase(dbUser)),
    };
  }

  async create(createUser: UserRepositoryCreateParams): Promise<User> {
    const mongoUser = new UserDatabase({
      name: createUser.name,
      email: createUser.email,
      coordinates: {
        type: "Point",
        coordinates: [
          createUser.coordinates.longitude,
          createUser.coordinates.latitude,
        ],
      },
      address: createUser.address,
    });
    await mongoUser.save();
    return User.fromDatabase(mongoUser);
  }

  async findById(id: string): Promise<User> {
    const mongoUser = await UserDatabase.findById(id).exec();
    return mongoUser ? User.fromDatabase(mongoUser) : null;
  }

  async findByEmail(email: string): Promise<User> {
    const mongoUser = await UserDatabase.findOne({ email }).exec();
    return mongoUser ? User.fromDatabase(mongoUser) : null;
  }

  async delete(id: string): Promise<void> {
    await UserDatabase.findByIdAndDelete(id).exec();
  }
}
