import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { mockRegionData } from "../../mocks/models/region.mock";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { DeleteRegionUseCase } from "./deleteRegion.useCase";
import { FindRegionByIdUseCase } from "./findRegionById.useCase";

describe("DeleteRegionUseCase", () => {
  let deleteRegionUseCase: DeleteRegionUseCase;
  let regionRepository: IRegionRepository;
  let findRegionByIdUseCase: FindRegionByIdUseCase;

  beforeEach(() => {
    regionRepository = regionRepositoryMock;
    findRegionByIdUseCase = new FindRegionByIdUseCase(regionRepository);
    deleteRegionUseCase = new DeleteRegionUseCase(
      regionRepository,
      findRegionByIdUseCase
    );
  });

  it("should delete a region", async () => {
    regionRepository.delete = jest.fn().mockResolvedValue(undefined);
    findRegionByIdUseCase.execute = jest.fn().mockResolvedValue(mockRegionData);

    const regionId = "id";
    const result = await deleteRegionUseCase.execute(regionId);

    expect(findRegionByIdUseCase.execute).toHaveBeenCalledWith(regionId);
    expect(regionRepository.delete).toHaveBeenCalledWith("id");
    expect(result).toBeUndefined();
  });
});
