import { DeleteRegionUseCase } from "../../../useCases/region/deleteRegion.useCase";
import { makeRegionRepository } from "../../repositories/regionRepository.factory";
import { makeFindRegionByIdUseCase } from "./findRegionByIdUseCase.factory";

export function makeDeleteRegionUseCase() {
  const regionRepository = makeRegionRepository();
  const findRegionByIdUseCase = makeFindRegionByIdUseCase();
  return new DeleteRegionUseCase(regionRepository, findRegionByIdUseCase);
}
