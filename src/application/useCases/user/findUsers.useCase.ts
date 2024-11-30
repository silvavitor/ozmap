import {
  IUserRepository,
  UserRepositoryFindParams,
} from "../../interfaces/userRepository.interface";
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
    const formattedFilter: UserRepositoryFindParams = {
      ...filter,
      limit:
        filter.limit && !Number.isNaN(filter.limit) ? Number(filter.limit) : 10,
      skip: filter.skip && !Number.isNaN(filter.skip) ? Number(filter.skip) : 0,
    };

    const users = await this.userRepository.findPaginated(formattedFilter);
    return users;
  }
}
