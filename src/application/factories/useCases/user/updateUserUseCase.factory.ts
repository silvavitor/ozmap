import { IResolveCoordinatesAndAddressService } from "../../../interfaces/geolocalizationService.interface";
import { UpdateUserUseCase } from "../../../useCases/user/updateUser.useCase";
import { makeUserRepository } from "../../repositories/userRepository.factory";
import { makeFindUserByIdUseCase } from "./findUserByIdUseCase.factory";

export function makeUpdateUserUseCase(
  coordinatesAndAddressResolver: IResolveCoordinatesAndAddressService
) {
  const userRepository = makeUserRepository();
  const findUserByIdUseCase = makeFindUserByIdUseCase();

  return new UpdateUserUseCase(
    coordinatesAndAddressResolver,
    userRepository,
    findUserByIdUseCase
  );
}
