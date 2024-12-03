import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { Region } from "../../models/region.model";
import { FindRegionsUseCase } from "./findRegions.useCase";

describe("FindRegionsUseCase", () => {
  let findRegionsUseCase: FindRegionsUseCase;
  let regionRepository: IRegionRepository;

  beforeEach(() => {
    (regionRepository = regionRepositoryMock),
      (findRegionsUseCase = new FindRegionsUseCase(regionRepository));
  });

  it("should return a paginated list of regions", async () => {
    regionRepository.findPaginated = jest.fn().mockResolvedValue({
      data: [new Region()],
      skip: 0,
      total: 1,
    });

    const filter = { name: "Region 1", userId: "user123" };
    const result = await findRegionsUseCase.execute(filter);

    expect(regionRepository.findPaginated).toHaveBeenCalledWith({
      name: filter.name,
      userId: filter.userId,
      limit: 10,
      skip: 0,
    });
    expect(result.data).toHaveLength(1);
    expect(result.total).toBe(1);
  });
});
