import { OnlyAddressOrCoordinatesMustBeProvidedError } from "../../errors/onlyAddressOrCoordinatesMusBeProvided.error";
import { IResolveCoordinatesAndAddressService } from "../../interfaces/geolocalizationService.interface";
import {
  IUserRepository,
  UserRepositoryUpdateParams,
} from "../../interfaces/userRepository.interface";
import { User } from "../../models/user.model";
import { Address } from "../../types/address.type";
import { Coordinates } from "../../types/coordinates.type";
import { FindUserByIdUseCase } from "./findUserById.useCase";

export type CreateUserUseCaseParams = {
  name: string;
  email: string;
  address?: Address;
  coordinates?: Coordinates;
};

export class UpdateUserUseCase {
  constructor(
    private readonly coordinatesAndAddressResolver: IResolveCoordinatesAndAddressService,
    private readonly userRepository: IUserRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ) {}
  async execute(
    id: string,
    updateUser: CreateUserUseCaseParams
  ): Promise<User> {
    if (updateUser.address && updateUser.coordinates) {
      throw new OnlyAddressOrCoordinatesMustBeProvidedError();
    }

    if (updateUser.coordinates) {
      updateUser.address =
        this.coordinatesAndAddressResolver.resolveCoordinates(
          updateUser.coordinates
        );
    } else if (updateUser.address) {
      updateUser.coordinates =
        this.coordinatesAndAddressResolver.resolveAddress(updateUser.address);
    }

    const userExists = await this.findUserByIdUseCase.execute(id);

    const formattedUpdatedUser: UserRepositoryUpdateParams = {
      ...updateUser,
    };

    return await this.userRepository.update(id, formattedUpdatedUser);
  }
}
