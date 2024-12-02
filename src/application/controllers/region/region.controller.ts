import { Region } from "../../models/region.model";
import { ControllerResponse } from "../../types/controllerResponse.type";
import { Page } from "../../types/page.type";
import {
  CreateRegionUseCase,
  CreateRegionUseCaseParams,
} from "../../useCases/region/createRegion.useCase";
import { DeleteRegionUseCase } from "../../useCases/region/deleteRegion.useCase";
import { FindRegionByIdUseCase } from "../../useCases/region/findRegionById.useCase";
import { FindRegionByPointUseCase } from "../../useCases/region/findRegionByPoint.useCase";
import { FindRegionByPointDistanceUseCase } from "../../useCases/region/findRegionByPointDistance.useCase";
import { FindRegionsUseCase } from "../../useCases/region/findRegions.useCase";
import {
  UpdateRegionUseCase,
  UpdateRegionUseCaseParams,
} from "../../useCases/region/updateRegion.useCase";
import { handleControllerError } from "../../utils/handleControllerError.util";
import {
  createRegionSchema,
  findByCoordinatesDistanceRegionSchema,
  findByCoordinatesRegionSchema,
  updateRegionSchema,
} from "./region.controller.schema";
import {
  CreateRegionPayload,
  FindAllRegionFilter,
  FindByCoordinatesDistanceFilter,
  FindRegionByCoordinatesFilter,
  UpdateRegionPayload,
} from "./regions.controller.types";

export class RegionController {
  constructor(
    private readonly createRegionUseCase: CreateRegionUseCase,
    private readonly findRegionByIdUseCase: FindRegionByIdUseCase,
    private readonly findRegionsUseCase: FindRegionsUseCase,
    private readonly findRegionByPointUseCase: FindRegionByPointUseCase,
    private readonly findRegionByPointDistanceUseCase: FindRegionByPointDistanceUseCase,
    private readonly updateRegionUseCase: UpdateRegionUseCase,
    private readonly deleteRegionUseCase: DeleteRegionUseCase
  ) {}

  async create(
    payload: CreateRegionPayload
  ): Promise<ControllerResponse<Region>> {
    try {
      const { userId, name, coordinates } = createRegionSchema.parse(payload);

      const updatedRegion: CreateRegionUseCaseParams = {
        userId,
        name,
        coordinates: coordinates.map((polygons) => {
          return polygons.map((coordinates) => ({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }));
        }),
      };

      const newRegion = await this.createRegionUseCase.execute(updatedRegion);

      return {
        statusCode: 201,
        body: newRegion,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async update(
    id: string,
    payload: UpdateRegionPayload
  ): Promise<ControllerResponse<Region>> {
    try {
      const { name, coordinates } = updateRegionSchema.parse(payload);

      const updatedRegion: UpdateRegionUseCaseParams = {
        name,
        coordinates: coordinates?.map((polygons) => {
          return polygons.map((coordinates) => ({
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }));
        }),
      };

      const region = await this.updateRegionUseCase.execute(id, updatedRegion);

      return {
        statusCode: 200,
        body: region,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async delete(id: string): Promise<ControllerResponse> {
    try {
      await this.deleteRegionUseCase.execute(id);
      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async findOneById(id: string): Promise<ControllerResponse<Region>> {
    try {
      const region = await this.findRegionByIdUseCase.execute(id);
      return {
        statusCode: 200,
        body: region,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async findAll(
    filter?: FindAllRegionFilter
  ): Promise<ControllerResponse<Page<Region>>> {
    try {
      const regions = await this.findRegionsUseCase.execute(filter);

      return {
        statusCode: 200,
        body: regions,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async findByCoordinates(
    filter: FindRegionByCoordinatesFilter
  ): Promise<ControllerResponse<Page<Region>>> {
    try {
      findByCoordinatesRegionSchema.parse(filter);

      const regions = await this.findRegionByPointUseCase.execute(filter);

      return {
        statusCode: 200,
        body: regions,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async findByCoordinatesDistance(
    filter: FindByCoordinatesDistanceFilter
  ): Promise<ControllerResponse<Page<Region>>> {
    try {
      findByCoordinatesDistanceRegionSchema.parse(filter);

      const regions = await this.findRegionByPointDistanceUseCase.execute(
        filter
      );

      return {
        statusCode: 200,
        body: regions,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
