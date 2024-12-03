import { AddressOrCoordinatesMustBeProvidedError } from "../../errors/addressOrCoordinatesMusBeProvidaded.error";
import { EmailAlreadyExists } from "../../errors/emailAlreadyExists.error";
import { OnlyAddressOrCoordinatesMustBeProvidedError } from "../../errors/onlyAddressOrCoordinatesMusBeProvided.error";
import { mockUserData } from "../../mocks/models/user.mock";
import { userRepositoryMock } from "../../mocks/repositories/user.repository.mock";
import { geolocalizationServiceMock } from "../../mocks/services/geolocalizationService.mock";
import { CreateUserUseCase } from "./createUser.useCase";

describe("CreateUserUseCase", () => {
  it("should throw an error if email already exists", async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(mockUserData);

    const createUserUseCase = new CreateUserUseCase(
      geolocalizationServiceMock,
      userRepositoryMock
    );

    await expect(
      createUserUseCase.execute({
        name: "Jane Doe",
        email: "johndoe@example.com",
        address: mockUserData.address,
        coordinates: mockUserData.coordinates,
      })
    ).rejects.toThrow(EmailAlreadyExists);
  });

  it("should throw an error if both address and coordinates are provided", async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);

    const createUserUseCase = new CreateUserUseCase(
      geolocalizationServiceMock,
      userRepositoryMock
    );

    await expect(
      createUserUseCase.execute({
        name: "Jane Doe",
        email: "janedoe@example.com",
        address: mockUserData.address,
        coordinates: mockUserData.coordinates,
      })
    ).rejects.toThrow(OnlyAddressOrCoordinatesMustBeProvidedError);
  });

  it("should throw an error if neither address nor coordinates are provided", async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);

    const createUserUseCase = new CreateUserUseCase(
      geolocalizationServiceMock,
      userRepositoryMock
    );

    await expect(
      createUserUseCase.execute({
        name: "Jane Doe",
        email: "janedoe@example.com",
      })
    ).rejects.toThrow(AddressOrCoordinatesMustBeProvidedError);
  });

  it("should create a new user when valid parameters are provided", async () => {
    userRepositoryMock.findByEmail.mockResolvedValue(null);

    const createUserUseCase = new CreateUserUseCase(
      geolocalizationServiceMock,
      userRepositoryMock
    );
    geolocalizationServiceMock.resolveCoordinates.mockResolvedValue(
      mockUserData.address
    );
    geolocalizationServiceMock.resolveAddress.mockResolvedValue(
      mockUserData.coordinates
    );

    userRepositoryMock.create.mockResolvedValue(mockUserData);

    const result = await createUserUseCase.execute({
      name: "Jane Doe",
      email: "janedoe@example.com",
      coordinates: mockUserData.coordinates,
    });

    expect(result).toEqual(mockUserData);
    expect(userRepositoryMock.create).toHaveBeenCalledWith({
      name: "Jane Doe",
      email: "janedoe@example.com",
      address: mockUserData.address,
      coordinates: mockUserData.coordinates,
    });
  });
});
