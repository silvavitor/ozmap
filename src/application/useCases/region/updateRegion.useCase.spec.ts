import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { mockRegionData } from "../../mocks/models/region.mock";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { FindRegionByIdUseCase } from "./findRegionById.useCase";
import { UpdateRegionUseCase } from "./updateRegion.useCase";

describe("UpdateRegionUseCase", () => {
  let updateRegionUseCase: UpdateRegionUseCase;
  let regionRepository: IRegionRepository;
  let findRegionByIdUseCase: FindRegionByIdUseCase;

  beforeEach(() => {
    regionRepository = regionRepositoryMock;
    findRegionByIdUseCase = new FindRegionByIdUseCase(regionRepository);
    updateRegionUseCase = new UpdateRegionUseCase(
      regionRepository,
      findRegionByIdUseCase
    );
  });

  it("should update a region", async () => {
    findRegionByIdUseCase.execute = jest.fn().mockReturnValue(mockRegionData);

    const regionId = "id";
    const updateData = { name: "Updated Region" };

    regionRepository.update = jest
      .fn()
      .mockReturnValue({ ...mockRegionData, ...updateData });

    const result = await updateRegionUseCase.execute(regionId, updateData);

    expect(findRegionByIdUseCase.execute).toHaveBeenCalledWith(regionId);
    expect(regionRepository.update).toHaveBeenCalledWith(regionId, updateData);
    expect(result.name).toBe("Updated Region");
  });
});
