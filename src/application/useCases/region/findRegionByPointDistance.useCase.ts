import {
  IRegionRepository,
  RegionRepositoryFindByCoordinatesDistanceParams,
} from "../../interfaces/regionRepository.interface";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";
import { Page } from "../../types/page.type";

export type FindRegionByPointDistanceUseCaseParams = {
  coordinates: Coordinates;
  distance: number;
  userId?: string;
  limit?: number;
  skip?: number;
};

export class FindRegionByPointDistanceUseCase {
  constructor(private readonly regionRepository: IRegionRepository) {}
  async execute(
    filter: FindRegionByPointDistanceUseCaseParams
  ): Promise<Page<Region>> {
    const formattedFilter: RegionRepositoryFindByCoordinatesDistanceParams = {
      ...filter,
      limit:
        filter.limit && !Number.isNaN(filter.limit) ? Number(filter.limit) : 10,
      skip: filter.skip && !Number.isNaN(filter.skip) ? Number(filter.skip) : 0,
    };

    const regions = await this.regionRepository.findByCoordinatesDistance(
      formattedFilter
    );

    return regions;
  }
}
