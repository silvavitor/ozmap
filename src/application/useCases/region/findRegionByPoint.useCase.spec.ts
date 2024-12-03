import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";
import { FindRegionByPointUseCase } from "./findRegionByPoint.useCase";

describe("FindRegionByPointUseCase", () => {
  let findRegionByPointUseCase: FindRegionByPointUseCase;
  let regionRepository: IRegionRepository;

  beforeEach(() => {
    regionRepository = regionRepositoryMock;
    findRegionByPointUseCase = new FindRegionByPointUseCase(regionRepository);
  });

  it("should return regions by coordinates", async () => {
    regionRepository.findByCoordinates = jest.fn().mockResolvedValue({
      data: [new Region()],
      skip: 0,
      total: 1,
    });
    const coordinates: Coordinates = { latitude: 10, longitude: 20 };
    const result = await findRegionByPointUseCase.execute({ coordinates });

    expect(regionRepository.findByCoordinates).toHaveBeenCalledWith({
      coordinates,
      limit: 10,
      skip: 0,
    });
    expect(result.data).toHaveLength(1);
    expect(result.total).toBe(1);
  });
});
