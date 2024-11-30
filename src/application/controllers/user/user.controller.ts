import { CreateUserUseCase } from "../../useCases/user/createUser.useCase";
import { DeleteUserUseCase } from "../../useCases/user/deleteUser.useCase";
import { FindUserByIdUseCase } from "../../useCases/user/findUserById.useCase";
import { FindUsersUseCase } from "../../useCases/user/findUsers.useCase";
import { UpdateUserUseCase } from "../../useCases/user/updateUser.useCase";
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
  async create(payload: CreateUserPayload) {
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

    return newUser;
  }

  async findOneById(id: string) {
    const user = await this.findUserByIdUseCase.execute(id);
    return user;
  }

  async findAll(filter?: FindAllUserFilter) {
    const users = await this.findUsersUseCase.execute(filter);

    return users;
  }

  async update(id: string, payload: UpdateUserPayload) {
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
        : null,
      coordinates: coordinates
        ? {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }
        : null,
    };

    const user = await this.updateUserUseCase.execute(id, updatedUser);

    return user;
  }

  async delete(id: string) {
    const user = await this.deleteUserUseCase.execute(id);
    return user;
  }
}
