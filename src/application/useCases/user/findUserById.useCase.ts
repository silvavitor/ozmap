import { IUserRepository } from "../../interfaces/userRepository.interface";
import { User } from "../../models/user.model";

export class FindUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    return user;
  }
}
