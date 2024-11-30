import { IUserRepository } from "../../interfaces/userRepository.interface";
import { User } from "../../models/user.model";

export type FindUsersUseCaseParams = {
  name?: string;
  address?: string;
  limit?: number;
  skip?: number;
};

export class FindUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(filter: FindUsersUseCaseParams): Promise<User[]> {
    const user = await this.userRepository.find(filter);
    return user;
  }
}
