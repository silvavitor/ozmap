import { FindUserByIdUseCase } from "../../../useCases/user/findUserById.useCase";
import { makeUserRepository } from "../../repositories/userRepository.factory";

export function makeFindUserByIdUseCase() {
  const userRepository = makeUserRepository();
  return new FindUserByIdUseCase(userRepository);
}
