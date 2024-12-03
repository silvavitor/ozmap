import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";
import { CreateRegionUseCase } from "./createRegion.useCase";

describe("CreateRegionUseCase", () => {
  let createRegionUseCase: CreateRegionUseCase;
  let regionRepository: IRegionRepository;

  beforeEach(() => {
    regionRepository = regionRepositoryMock;
    createRegionUseCase = new CreateRegionUseCase(regionRepository);
  });

  it("should create a new region", async () => {
    regionRepository.create = jest.fn().mockResolvedValue(new Region());

    const regionData = {
      name: "New Region",
      userId: "user123",
      coordinates: [[{ latitude: 10, longitude: 20 }]] as Coordinates[][],
    };

    const result = await createRegionUseCase.execute(regionData);

    expect(regionRepository.create).toHaveBeenCalledWith({
      name: regionData.name,
      userId: regionData.userId,
      coordinates: regionData.coordinates,
    });
    expect(result).toBeInstanceOf(Region);
  });
});
