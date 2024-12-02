import {
  IRegionRepository,
  RegionRepositoryUpdateParams,
} from "../../interfaces/regionRepository.interface";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";
import { FindRegionByIdUseCase } from "./findRegionById.useCase";

export type UpdateRegionUseCaseParams = {
  name?: string;
  coordinates?: Coordinates[][];
};

export class UpdateRegionUseCase {
  constructor(
    private readonly regionRepository: IRegionRepository,
    private readonly findRegionByIdUseCase: FindRegionByIdUseCase
  ) {}
  async execute(
    id: string,
    updateRegion: UpdateRegionUseCaseParams
  ): Promise<Region> {
    const regionExists = await this.findRegionByIdUseCase.execute(id);

    console.log(
      `updating region ${regionExists.id}. [payload][${JSON.stringify(
        updateRegion
      )}]`
    );

    const formattedUpdatedRegion: RegionRepositoryUpdateParams = {
      ...updateRegion,
    };

    return await this.regionRepository.update(id, formattedUpdatedRegion);
  }
}
