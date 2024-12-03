import { NotFoundError } from "../../errors/userNotFound.error";
import { IRegionRepository } from "../../interfaces/regionRepository.interface";
import { regionRepositoryMock } from "../../mocks/repositories/region.repository.mock";
import { Region } from "../../models/region.model";
import { FindRegionByIdUseCase } from "./findRegionById.useCase";

describe("FindRegionByIdUseCase", () => {
  let findRegionByIdUseCase: FindRegionByIdUseCase;
  let regionRepository: IRegionRepository;

  beforeEach(() => {
    regionRepository = regionRepositoryMock;
    findRegionByIdUseCase = new FindRegionByIdUseCase(regionRepository);
  });

  it("should return a region by id", async () => {
    regionRepository.findById = jest.fn().mockResolvedValue(new Region());
    const regionId = "region123";
    const result = await findRegionByIdUseCase.execute(regionId);

    expect(regionRepository.findById).toHaveBeenCalledWith(regionId);
    expect(result).toBeInstanceOf(Region);
  });

  it("should throw NotFoundError if region not found", async () => {
    regionRepository.findById = jest.fn().mockResolvedValue(null);

    await expect(findRegionByIdUseCase.execute("region123")).rejects.toThrow(
      new NotFoundError("region region123 not found")
    );
  });
});
