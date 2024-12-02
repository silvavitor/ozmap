import {
  IRegionRepository,
  RegionRepositoryCreateParams,
} from "../../interfaces/regionRepository.interface";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";

export type CreateRegionUseCaseParams = {
  name: string;
  userId: string;
  coordinates: Coordinates[][];
};

export class CreateRegionUseCase {
  constructor(private readonly regionRepository: IRegionRepository) {}
  async execute(createRegion: CreateRegionUseCaseParams): Promise<Region> {
    const formattedNewRegion: RegionRepositoryCreateParams = {
      name: createRegion.name,
      userId: createRegion.userId,
      coordinates: createRegion.coordinates,
    };

    return await this.regionRepository.create(formattedNewRegion);
  }
}
