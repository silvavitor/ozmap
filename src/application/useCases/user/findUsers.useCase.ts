import { IUserRepository } from "../../interfaces/userRepository.interface";
import { User } from "../../models/user.model";
import { Page } from "../../types/page.type";

export type FindUsersUseCaseParams = {
  name?: string;
  address?: string;
  limit?: number;
  skip?: number;
};

export class FindUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(filter: FindUsersUseCaseParams): Promise<Page<User>> {
    const user = await this.userRepository.findPaginated(filter);
    return user;
  }
}
