import { NotFoundError } from "../../errors/userNotFound.error";
import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { Region } from "../../models/region.model";

export class FindRegionByIdUseCase {
  constructor(private readonly regionRepository: IRegionRepository) {}
  async execute(id: string): Promise<Region> {
    const region = await this.regionRepository.findById(id);

    if (!region) {
      throw new NotFoundError(`region ${id} not found`);
    }

    return region;
  }
}
