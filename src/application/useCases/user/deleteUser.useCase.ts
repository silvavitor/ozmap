import { IUserRepository } from "../../interfaces/userRepository.interface";
import { FindUserByIdUseCase } from "./findUserById.useCase";

export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly findUserByIdUseCase: FindUserByIdUseCase
  ) {}
  async execute(id: string): Promise<void> {
    const user = await this.findUserByIdUseCase.execute(id);

    return await this.userRepository.delete(user.id);
  }
}
