import { IUserRepository } from "../../interfaces/userRepository.interface";

export const userRepositoryMock: jest.Mocked<IUserRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findByEmail: jest.fn(),
  findPaginated: jest.fn(),
  delete: jest.fn(),
};
