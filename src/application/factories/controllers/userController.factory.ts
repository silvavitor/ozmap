import { UserController } from "../../controllers/user/user.controller";
import { IResolveCoordinatesAndAddressService } from "../../interfaces/geolocalizationService.interface";
import { makeCreateUserUseCase } from "../useCases/user/createUserUseCase.factory";
import { makeFindUserByIdUseCase } from "../useCases/user/findUserByIdUseCase.factory";

type Service = IResolveCoordinatesAndAddressService;

export function makeUserController(service: Service) {
  const createUserUseCase = makeCreateUserUseCase(service);
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  return new UserController(createUserUseCase, findUserByIdUseCase);
}
