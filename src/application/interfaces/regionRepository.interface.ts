import { Region } from "../models/region.model";
import { Coordinates } from "../types/coordinates.type";
import { Page } from "../types/page.type";
import { PaginationFilter } from "../types/paginationFilter.type";

export type RegionRepositoryCreateParams = {
  name: string;
  userId: string;
  coordinates: Coordinates[][];
};

export type RegionRepositoryUpdateParams = {
  name?: string;
  coordinates?: Coordinates[][];
};

export type RegionRepositoryFindParams = {
  name?: string;
  userId?: string;
} & PaginationFilter;

export type RegionRepositoryFindByCoordinatesParams = {
  coordinates: Coordinates;
} & PaginationFilter;

export type RegionRepositoryFindByCoordinatesDistanceParams = {
  coordinates: Coordinates;
  distance: number;
  userId?: string;
} & PaginationFilter;

export interface IRegionRepository {
  create(createRegion: RegionRepositoryCreateParams): Promise<Region>;

  update(
    id: string,
    updateRegion: RegionRepositoryUpdateParams
  ): Promise<Region>;

  findById(id: string): Promise<Region>;

  findPaginated(filter: RegionRepositoryFindParams): Promise<Page<Region>>;

  findByCoordinates(
    filter: RegionRepositoryFindByCoordinatesParams
  ): Promise<Page<Region>>;

  findByCoordinatesDistance(
    filter: RegionRepositoryFindByCoordinatesDistanceParams
  ): Promise<Page<Region>>;

  delete(id: string): Promise<void>;
}
