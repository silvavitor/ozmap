import { UserMongo } from "../../database/models/databaseUser.model";
import { Address } from "../types/address.type";
import { Coordinates } from "../types/coordinates.type";
import { BaseModel } from "./base.model";

export class User extends BaseModel<User> {
  name: string;
  email: string;
  address: Address;
  coordinates: Coordinates;

  static fromDatabase(mongoUser: UserMongo): User {
    const user = new User({
      id: mongoUser.id,
      name: mongoUser.name,
      email: mongoUser.email,
      address: mongoUser.address,
      coordinates: {
        latitude: mongoUser.coordinates.coordinates[0],
        longitude: mongoUser.coordinates.coordinates[1],
      },
    });
    return user;
  }
}
