import { RegionController } from "../../controllers/region/region.controller";
import { makeCreateRegionUseCase } from "../useCases/region/createRegionUseCase.factory";
import { makeDeleteRegionUseCase } from "../useCases/region/deleteRegionUseCase.factory";
import { makeFindRegionByIdUseCase } from "../useCases/region/findRegionByIdUseCase.factory";
import { makeFindRegionByPointDistanceUseCase } from "../useCases/region/findRegionByPointDistanceUseCase.factory";
import { makeFindRegionByPointUseCase } from "../useCases/region/findRegionByPointUseCase.factory";
import { makeFindRegionsUseCase } from "../useCases/region/findRegionsUseCase.factory";
import { makeUpdateRegionUseCase } from "../useCases/region/updateRegionUseCase.factory";

export function makeRegionController() {
  const createRegionUseCase = makeCreateRegionUseCase();
  const findRegionByIdUseCase = makeFindRegionByIdUseCase();
  const findRegionsUseCase = makeFindRegionsUseCase();
  const findRegionByPointUseCase = makeFindRegionByPointUseCase();
  const findRegionByPointDistanceUseCase =
    makeFindRegionByPointDistanceUseCase();
  const updateRegionUseCase = makeUpdateRegionUseCase();
  const deleteRegionUseCase = makeDeleteRegionUseCase();

  return new RegionController(
    createRegionUseCase,
    findRegionByIdUseCase,
    findRegionsUseCase,
    findRegionByPointUseCase,
    findRegionByPointDistanceUseCase,
    updateRegionUseCase,
    deleteRegionUseCase
  );
}
