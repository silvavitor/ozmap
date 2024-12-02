import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { UserRepositoryFindParams } from "../../interfaces/userRepository.interface";
import { Region } from "../../models/region.model";
import { Page } from "../../types/page.type";

export type FindRegionsUseCaseParams = {
  name?: string;
  userId?: string;
  limit?: number;
  skip?: number;
};

export class FindRegionsUseCase {
  constructor(private readonly regionRepository: IRegionRepository) {}
  async execute(filter: FindRegionsUseCaseParams): Promise<Page<Region>> {
    const formattedFilter: UserRepositoryFindParams = {
      ...filter,
      limit:
        filter.limit && !Number.isNaN(filter.limit) ? Number(filter.limit) : 10,
      skip: filter.skip && !Number.isNaN(filter.skip) ? Number(filter.skip) : 0,
    };

    const regions = await this.regionRepository.findPaginated(formattedFilter);
    return regions;
  }
}
