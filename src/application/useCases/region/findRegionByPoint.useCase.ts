import {
  IRegionRepository,
  RegionRepositoryFindByCoordinatesParams,
} from "../../interfaces/regionRepository.interface";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";
import { Page } from "../../types/page.type";

export type FindRegionByPointUseCaseParams = {
  coordinates: Coordinates;
  limit?: number;
  skip?: number;
};

export class FindRegionByPointUseCase {
  constructor(private readonly regionRepository: IRegionRepository) {}
  async execute(filter: FindRegionByPointUseCaseParams): Promise<Page<Region>> {
    const formattedFilter: RegionRepositoryFindByCoordinatesParams = {
      coordinates: filter.coordinates,
      limit:
        filter.limit && !Number.isNaN(filter.limit) ? Number(filter.limit) : 10,
      skip: filter.skip && !Number.isNaN(filter.skip) ? Number(filter.skip) : 0,
    };

    const regions = await this.regionRepository.findByCoordinates(
      formattedFilter
    );
    return regions;
  }
}
