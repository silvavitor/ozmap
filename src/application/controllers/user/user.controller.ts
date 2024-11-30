import { CreateUserUseCase } from "../../useCases/user/createUser.useCase";
import { FindUserByIdUseCase } from "../../useCases/user/findUserById.useCase";
import { FindUsersUseCase } from "../../useCases/user/findUsers.useCase";
import { createUserSchema } from "./user.controller.schemas";
import { CreateUserPayload, FindAllUserFilter } from "./user.controller.types";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly findUsersUseCase: FindUsersUseCase
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

  update() {}

  delete() {}
}
