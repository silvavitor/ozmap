import { FindRegionByPointDistanceUseCase } from "../../../useCases/region/findRegionByPointDistance.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";

export function makeFindRegionByPointDistanceUseCase() {
  const regionRepository = makeRegionRepository();
  return new FindRegionByPointDistanceUseCase(regionRepository);
}
