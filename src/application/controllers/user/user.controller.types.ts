import { Address } from "../../types/address.type";
import { Coordinates } from "../../types/coordinates.type";

export type CreateUserPayload = {
  name: string;
  email: string;
  address?: Address;
  coordinates?: Coordinates;
};
