import { User } from "../models/user.model";
import { Address } from "../types/address.type";
import { Coordinates } from "../types/coordinates.type";
import { Page } from "../types/page.type";

export type UserRepositoryCreateParams = {
  name: string;
  email: string;
  address: Address;
  coordinates: Coordinates;
};

export type UserRepositoryUpdateParams = {
  name?: string;
  email?: string;
  address?: Address;
  coordinates?: Coordinates;
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

  update(id: string, updateUser: UserRepositoryUpdateParams): Promise<User>;

  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  findPaginated(filter: UserRepositoryFindParams): Promise<Page<User>>;

  delete(id: string): Promise<void>;
}
