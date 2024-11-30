import { Address } from "../types/address.type";
import { Coordinates } from "../types/coordinates.type";
import { BaseModel } from "./base.model";

export class User extends BaseModel<User> {
  name: string;
  email: string;
  address: Address;
  coordinates: Coordinates;
}
