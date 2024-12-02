import { FindRegionByIdUseCase } from "../../../useCases/region/findRegionById.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";

export function makeFindRegionByIdUseCase() {
  const regionRepository = makeRegionRepository();
  return new FindRegionByIdUseCase(regionRepository);
}
