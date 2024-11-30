import { IResolveCoordinatesAndAddressService } from "../../../interfaces/geolocalizationService.interface";
import { CreateUserUseCase } from "../../../useCases/user/createUser.useCase";
import { makeUserRepository } from "../../repositories/userRepository.factory";

export function makeCreateUserUseCase(
  coordinatesAndAddressResolver: IResolveCoordinatesAndAddressService
) {
  const userRepository = makeUserRepository();
  return new CreateUserUseCase(coordinatesAndAddressResolver, userRepository);
}
