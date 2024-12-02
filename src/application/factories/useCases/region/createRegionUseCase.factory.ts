import { CreateRegionUseCase } from "../../../useCases/region/createRegion.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";

export function makeCreateRegionUseCase() {
  const regionRepository = makeRegionRepository();
  return new CreateRegionUseCase(regionRepository);
}
