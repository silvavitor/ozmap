import { UpdateRegionUseCase } from "../../../useCases/region/updateRegion.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";
import { makeFindRegionByIdUseCase } from "./findRegionByIdUseCase.factory";

export function makeUpdateRegionUseCase() {
  const regionRepository = makeRegionRepository();
  const findRegionByIdUseCase = makeFindRegionByIdUseCase();
  return new UpdateRegionUseCase(regionRepository, findRegionByIdUseCase);
}
