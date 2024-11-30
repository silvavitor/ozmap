import { UserController } from "../../controllers/user/user.controller";
import { IResolveCoordinatesAndAddressService } from "../../interfaces/geolocalizationService.interface";
import { makeCreateUserUseCase } from "../useCases/user/createUserUseCase.factory";
import { makeFindUserByIdUseCase } from "../useCases/user/findUserByIdUseCase.factory";
import { makeFindUsersUseCase } from "../useCases/user/findUsersUseCase.factory";
import { makeUpdateUserUseCase } from "../useCases/user/updateUserUseCase.factory";

type Service = IResolveCoordinatesAndAddressService;

export function makeUserController(service: Service) {
  const createUserUseCase = makeCreateUserUseCase(service);
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  const findUsersUseCase = makeFindUsersUseCase();
  const updateUserUseCase = makeUpdateUserUseCase(service);

  return new UserController(
    createUserUseCase,
    findUserByIdUseCase,
    findUsersUseCase,
    updateUserUseCase
  );
}
