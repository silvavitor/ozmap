import { Address } from "../../types/address.type";
import { Coordinates } from "../../types/coordinates.type";
import { PaginationFilter } from "../../types/paginationFilter.type";

export type CreateUserPayload = {
  name: string;
  email: string;
  address?: Address;
  coordinates?: Coordinates;
};

export type UpdateUserPayload = Partial<CreateUserPayload>;

export type FindAllUserFilter = {
  name?: string;
  address?: string;
} & PaginationFilter;
