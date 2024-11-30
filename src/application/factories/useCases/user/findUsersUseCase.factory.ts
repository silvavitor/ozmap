import { FindUsersUseCase } from "../../../useCases/user/findUsers.useCase";
import { makeUserRepository } from "../../repositories/userRepository.factory";

export function makeFindUsersUseCase() {
  const userRepository = makeUserRepository();
  return new FindUsersUseCase(userRepository);
}
