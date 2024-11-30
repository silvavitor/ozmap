import { Request, Response } from "express";
import { makeUserController } from "../../application/factories/controllers/userController.factory";
import { GeoLocationService } from "../services/geoLocation.service";

const geoLocationService = new GeoLocationService();

const applicationUserController = makeUserController(geoLocationService);

export async function createUser(request: Request, response: Response) {
  const { statusCode, body } = await applicationUserController.create(
    request.body
  );

  response.status(statusCode).json(body);
}

export async function getUsers(request: Request, response: Response) {
  const { skip, limit } = request.query;

  const filter = {
    skip: Number(skip),
    limit: Number(limit),
  };

  const { statusCode, body } = await applicationUserController.findAll(filter);

  response.status(statusCode).json(body);
}

export async function findUserById(request: Request, response: Response) {
  const { id } = request.params;

  const { statusCode, body } = await applicationUserController.findOneById(id);

  response.status(statusCode).json(body);
}

export async function updateUser(request: Request, response: Response) {
  const { id } = request.params;

  const { statusCode, body } = await applicationUserController.update(
    id,
    request.body
  );

  response.status(statusCode).json(body);
}

export async function deleteUser(request: Request, response: Response) {
  const { id } = request.params;

  const { statusCode, body } = await applicationUserController.delete(id);

  response.status(statusCode).json(body);
}
