import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { FindRegionByIdUseCase } from "./findRegionById.useCase";

export class DeleteRegionUseCase {
  constructor(
    private readonly regionRepository: IRegionRepository,
    private readonly findRegionByIdUseCase: FindRegionByIdUseCase
  ) {}
  async execute(id: string): Promise<void> {
    const region = await this.findRegionByIdUseCase.execute(id);

    console.log(`deleting region ${region.id}`);

    return await this.regionRepository.delete(region.id);
  }
}
