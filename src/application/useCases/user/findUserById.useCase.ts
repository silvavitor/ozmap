import { UserNotFoundError } from "../../errors/userNotFound.error";
import { IUserRepository } from "../../interfaces/userRepository.interface";
import { User } from "../../models/user.model";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundError(`user ${id} not found`);
    }

    return user;
  }
}
