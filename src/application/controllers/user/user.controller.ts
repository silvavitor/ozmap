import { User } from "../../models/user.model";
import { ControllerResponse } from "../../types/controllerResponse.type";
import { Page } from "../../types/page.type";
import { CreateUserUseCase } from "../../useCases/user/createUser.useCase";
import { DeleteUserUseCase } from "../../useCases/user/deleteUser.useCase";
import { FindUserByIdUseCase } from "../../useCases/user/findUserById.useCase";
import { FindUsersUseCase } from "../../useCases/user/findUsers.useCase";
import { UpdateUserUseCase } from "../../useCases/user/updateUser.useCase";
import { handleControllerError } from "../../utils/handleControllerError.util";
import { createUserSchema, updateUserSchema } from "./user.controller.schemas";
import {
  CreateUserPayload,
  FindAllUserFilter,
  UpdateUserPayload,
} from "./user.controller.types";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUsersUseCase: FindUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase
  ) {}

  async create(payload: CreateUserPayload): Promise<ControllerResponse<User>> {
    try {
      const { name, email, address, coordinates } =
        createUserSchema.parse(payload);

      const newUser = await this.createUserUseCase.execute({
        name,
        email,
        address: address
          ? {
              street: address.street,
              country: address.country,
              neighborhood: address.neighborhood,
              number: address.number,
              state: address.state,
              zipCode: address.zipCode,
              complement: address.complement,
            }
          : null,
        coordinates: coordinates
          ? {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }
          : null,
      });

      return {
        statusCode: 201,
        body: newUser,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async findOneById(id: string): Promise<ControllerResponse<User>> {
    try {
      const user = await this.findUserByIdUseCase.execute(id);
      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async findAll(
    filter?: FindAllUserFilter
  ): Promise<ControllerResponse<Page<User>>> {
    try {
      const users = await this.findUsersUseCase.execute(filter);

      return {
        statusCode: 200,
        body: users,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async update(
    id: string,
    payload: UpdateUserPayload
  ): Promise<ControllerResponse<User>> {
    try {
      const { name, email, address, coordinates } =
        updateUserSchema.parse(payload);

      const updatedUser = {
        name,
        email,
        address: address
          ? {
              street: address.street,
              country: address.country,
              neighborhood: address.neighborhood,
              number: address.number,
              state: address.state,
              zipCode: address.zipCode,
              complement: address.complement,
            }
          : undefined,
        coordinates: coordinates
          ? {
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }
          : undefined,
      };

      const user = await this.updateUserUseCase.execute(id, updatedUser);

      return {
        statusCode: 200,
        body: user,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }

  async delete(id: string): Promise<ControllerResponse> {
    try {
      await this.deleteUserUseCase.execute(id);
      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return handleControllerError(error);
    }
  }
}
