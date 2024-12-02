import { FindRegionByPointUseCase } from "../../../useCases/region/findRegionByPoint.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";

export function makeFindRegionByPointUseCase() {
  const regionRepository = makeRegionRepository();
  return new FindRegionByPointUseCase(regionRepository);
}
