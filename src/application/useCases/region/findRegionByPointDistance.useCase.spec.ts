import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { Region } from "../../models/region.model";
import { Coordinates } from "../../types/coordinates.type";
import { FindRegionByPointDistanceUseCase } from "./findRegionByPointDistance.useCase";

describe("FindRegionByPointDistanceUseCase", () => {
  let findRegionByPointDistanceUseCase: FindRegionByPointDistanceUseCase;
  let regionRepository: IRegionRepository;

  beforeEach(() => {
    regionRepository = regionRepositoryMock;
    findRegionByPointDistanceUseCase = new FindRegionByPointDistanceUseCase(
      regionRepository
    );
  });

  it("should return regions by coordinates and distance", async () => {
    regionRepositoryMock.findByCoordinatesDistance = jest
      .fn()
      .mockResolvedValue({
        data: [new Region()],
        skip: 0,
        total: 1,
      });
    const coordinates: Coordinates = { latitude: 10, longitude: 20 };
    const result = await findRegionByPointDistanceUseCase.execute({
      coordinates,
      distance: 10,
    });

    expect(regionRepository.findByCoordinatesDistance).toHaveBeenCalledWith({
      coordinates,
      distance: 10,
      limit: 10,
      skip: 0,
    });
    expect(result.data).toHaveLength(1);
    expect(result.total).toBe(1);
  });
});
