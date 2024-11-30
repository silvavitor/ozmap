import { User } from "../models/user.model";
import { Address } from "../types/address.type";
import { Coordinates } from "../types/coordinates.type";

export type UserRepositoryCreateParams = {
  name: string;
  email: string;
  address: Address;
  coordinates: Coordinates;
};

export type UserRepositoryFindParams = {
  name?: string;
  email?: string;
  street?: string;
  number?: number;
  neighborhood?: string;
  state?: string;
  zipCode?: string;
  country?: string;
};

export interface IUserRepository {
  create(createUser: UserRepositoryCreateParams): Promise<User>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  find(filter: UserRepositoryFindParams): Promise<User[]>;
}
