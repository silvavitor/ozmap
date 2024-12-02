import { FindRegionsUseCase } from "../../../useCases/region/findRegions.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";

export function makeFindRegionsUseCase() {
  const regionRepository = makeRegionRepository();
  return new FindRegionsUseCase(regionRepository);
}
