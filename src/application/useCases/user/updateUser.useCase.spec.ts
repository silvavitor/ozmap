import { OnlyAddressOrCoordinatesMustBeProvidedError } from "../../errors/onlyAddressOrCoordinatesMusBeProvided.error";
import { mockUserData } from "../../mocks/models/user.mock";
import { userRepositoryMock } from "../../mocks/repositories/user.repository.mock";
import { geolocalizationServiceMock } from "../../mocks/services/geolocalizationService.mock";
import { FindUserByIdUseCase } from "./findUserById.useCase";
import { UpdateUserUseCase } from "./updateUser.useCase";

describe("UpdateUserUseCase", () => {
  it("should throw an error if both address and coordinates are provided", async () => {
    const updateUserUseCase = new UpdateUserUseCase(
      geolocalizationServiceMock,
      userRepositoryMock,
      new FindUserByIdUseCase(userRepositoryMock)
    );

    await expect(
      updateUserUseCase.execute("1", {
        name: "Jane Doe",
        email: "janedoe@example.com",
        address: mockUserData.address,
        coordinates: mockUserData.coordinates,
      })
    ).rejects.toThrow(OnlyAddressOrCoordinatesMustBeProvidedError);
  });

  it("should update the user when valid parameters are provided", async () => {
    userRepositoryMock.findById.mockResolvedValue(mockUserData);

    const updateUserUseCase = new UpdateUserUseCase(
      geolocalizationServiceMock,
      userRepositoryMock,
      new FindUserByIdUseCase(userRepositoryMock)
    );
    geolocalizationServiceMock.resolveCoordinates.mockResolvedValue(
      mockUserData.address
    );
    geolocalizationServiceMock.resolveAddress.mockResolvedValue(
      mockUserData.coordinates
    );

    userRepositoryMock.update.mockResolvedValue(mockUserData);

    const result = await updateUserUseCase.execute("1", {
      name: "Jane Doe",
      email: "janedoe@example.com",
      coordinates: mockUserData.coordinates,
    });

    expect(result).toEqual(mockUserData);
  });
});
