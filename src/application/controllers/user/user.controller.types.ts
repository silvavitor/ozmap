import { Address } from "../../types/address.type";
import { Coordinates } from "../../types/coordinates.type";
import { PaginationFilter } from "../../types/paginationFilter.type";

export type CreateUserPayload = {
  name: string;
  email: string;
  address?: Address;
  coordinates?: Coordinates;
};

export type FindAllUserFilter = {
  name?: string;
  address?: string;
} & PaginationFilter;
