import { IRegionRepository } from "../../interfaces/regionRepository.interface";

export const regionRepositoryMock: jest.Mocked<IRegionRepository> = {
  create: jest.fn(),
  update: jest.fn(),
  findById: jest.fn(),
  findPaginated: jest.fn(),
  delete: jest.fn(),
  findByCoordinates: jest.fn(),
  findByCoordinatesDistance: jest.fn(),
};
