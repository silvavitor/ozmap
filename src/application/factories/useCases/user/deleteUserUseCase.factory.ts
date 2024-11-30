import { DeleteUserUseCase } from "../../../useCases/user/deleteUser.useCase";
import { makeUserRepository } from "../../repositories/userRepository.factory";
import { makeFindUserByIdUseCase } from "./findUserByIdUseCase.factory";

export function makeDeleteUserUseCase() {
  const userRepository = makeUserRepository();
  const findUserByIdUseCase = makeFindUserByIdUseCase();
  return new DeleteUserUseCase(userRepository, findUserByIdUseCase);
}
