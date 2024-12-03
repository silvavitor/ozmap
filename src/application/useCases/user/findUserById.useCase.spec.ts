import { NotFoundError } from "../../errors/userNotFound.error";
import { mockUserData } from "../../mocks/models/user.mock";
import { userRepositoryMock } from "../../mocks/repositories/user.repository.mock";
import { FindUserByIdUseCase } from "./findUserById.useCase";

describe("FindUserByIdUseCase", () => {
  it("should return user if found", async () => {
    userRepositoryMock.findById.mockResolvedValue(mockUserData);

    const findUserByIdUseCase = new FindUserByIdUseCase(userRepositoryMock);

    const result = await findUserByIdUseCase.execute("1");

    expect(userRepositoryMock.findById).toHaveBeenCalledWith("1");
    expect(result).toEqual(mockUserData);
  });

  it("should throw NotFoundError if user is not found", async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    const findUserByIdUseCase = new FindUserByIdUseCase(userRepositoryMock);

    await expect(findUserByIdUseCase.execute("nonexistent-id")).rejects.toThrow(
      NotFoundError
    );
    expect(userRepositoryMock.findById).toHaveBeenCalledWith("nonexistent-id");
  });
});
