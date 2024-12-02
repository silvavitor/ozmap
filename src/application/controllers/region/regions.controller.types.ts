import { Coordinates } from "../../types/coordinates.type";
import { PaginationFilter } from "../../types/paginationFilter.type";

export type CreateRegionPayload = {
  name: string;
  userId: string;
  coordinates?: Coordinates[][];
};

export type UpdateRegionPayload = {
  name?: string;
  coordinates?: Coordinates[][];
};

export type FindAllRegionFilter = {
  name?: string;
  userId?: string;
} & PaginationFilter;

export type FindRegionByCoordinatesFilter = {
  coordinates: Coordinates;
} & PaginationFilter;

export type FindByCoordinatesDistanceFilter = {
  coordinates: Coordinates;
  distance: number;
  userId?: string;
} & PaginationFilter;
