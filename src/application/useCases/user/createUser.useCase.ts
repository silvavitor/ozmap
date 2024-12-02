import { AddressOrCoordinatesMustBeProvidedError } from "../../errors/addressOrCoordinatesMusBeProvidaded.error";
import { EmailAlreadyExists } from "../../errors/emailAlreadyExists.error";
import { OnlyAddressOrCoordinatesMustBeProvidedError } from "../../errors/onlyAddressOrCoordinatesMusBeProvided.error";
import { IResolveCoordinatesAndAddressService } from "../../interfaces/geolocalizationService.interface";
import {
  IUserRepository,
  UserRepositoryCreateParams,
} from "../../interfaces/userRepository.interface";
import { User } from "../../models/user.model";
import { Address } from "../../types/address.type";
import { Coordinates } from "../../types/coordinates.type";

export type CreateUserUseCaseParams = {
  name: string;
  email: string;
  address?: Address;
  coordinates?: Coordinates;
};

export class CreateUserUseCase {
  constructor(
    private readonly coordinatesAndAddressResolver: IResolveCoordinatesAndAddressService,
    private readonly userRepository: IUserRepository
  ) {}
  async execute(createUser: CreateUserUseCaseParams): Promise<User> {
    const userWithEmailExists = await this.userRepository.findByEmail(
      createUser.email
    );

    if (userWithEmailExists) {
      throw new EmailAlreadyExists("this e-mail already exists");
    }

    if (createUser.address && createUser.coordinates) {
      throw new OnlyAddressOrCoordinatesMustBeProvidedError();
    }

    if (!createUser.address && !createUser.coordinates) {
      throw new AddressOrCoordinatesMustBeProvidedError();
    }

    if (createUser.coordinates) {
      createUser.address =
        await this.coordinatesAndAddressResolver.resolveCoordinates(
          createUser.coordinates
        );
    } else if (createUser.address) {
      createUser.coordinates =
        await this.coordinatesAndAddressResolver.resolveAddress(
          createUser.address
        );
    }

    const formattedNewUser: UserRepositoryCreateParams = {
      name: createUser.name,
      email: createUser.email,
      address: createUser.address,
      coordinates: createUser.coordinates,
    };

    return await this.userRepository.create(formattedNewUser);
  }
}
