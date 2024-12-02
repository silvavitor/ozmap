import { Request, Response } from "express";
import { makeRegionController } from "../../application/factories/controllers/regionController.factory";

const applicationRegionController = makeRegionController();

export async function createRegion(request: Request, response: Response) {
  const { statusCode, body } = await applicationRegionController.create(
    request.body
  );

  response.status(statusCode).json(body);
}

export async function getRegions(request: Request, response: Response) {
  const { skip, limit } = request.query;

  const filter = {
    skip: Number(skip),
    limit: Number(limit),
  };

  const { statusCode, body } = await applicationRegionController.findAll(
    filter
  );

  response.status(statusCode).json(body);
}

export async function findRegionById(request: Request, response: Response) {
  const { id } = request.params;

  const { statusCode, body } = await applicationRegionController.findOneById(
    id
  );

  response.status(statusCode).json(body);
}

export async function findRegionByCoordinates(
  request: Request,
  response: Response
) {
  const { skip, limit } = request.query;

  const { coordinates } = request.body;

  const { statusCode, body } =
    await applicationRegionController.findByCoordinates({
      skip: Number(skip),
      limit: Number(limit),
      coordinates,
    });

  response.status(statusCode).json(body);
}

export async function findRegionByCoordinatesDistance(
  request: Request,
  response: Response
) {
  const { skip, limit } = request.query;

  const { coordinates, distance } = request.body;

  const { statusCode, body } =
    await applicationRegionController.findByCoordinatesDistance({
      skip: Number(skip),
      limit: Number(limit),
      coordinates,
      distance,
    });

  response.status(statusCode).json(body);
}

export async function updateRegion(request: Request, response: Response) {
  const { id } = request.params;

  const { statusCode, body } = await applicationRegionController.update(
    id,
    request.body
  );

  response.status(statusCode).json(body);
}

export async function deleteRegion(request: Request, response: Response) {
  const { id } = request.params;

  const { statusCode, body } = await applicationRegionController.delete(id);

  response.status(statusCode).json(body);
}
