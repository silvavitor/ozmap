import { NotFoundError } from "../../errors/userNotFound.error";
import { mockUserData } from "../../mocks/models/user.mock";
import { userRepositoryMock } from "../../mocks/repositories/user.repository.mock";
import { DeleteUserUseCase } from "./deleteUser.useCase";
import { FindUserByIdUseCase } from "./findUserById.useCase";

describe("DeleteUserUseCase", () => {
  it("should throw an error if user is not found", async () => {
    userRepositoryMock.findById.mockResolvedValue(null);

    const deleteUserUseCase = new DeleteUserUseCase(
      userRepositoryMock,
      new FindUserByIdUseCase(userRepositoryMock)
    );

    await expect(deleteUserUseCase.execute("1")).rejects.toThrow(NotFoundError);
  });

  it("should delete the user when user exists", async () => {
    userRepositoryMock.findById.mockResolvedValue(mockUserData);

    const deleteUserUseCase = new DeleteUserUseCase(
      userRepositoryMock,
      new FindUserByIdUseCase(userRepositoryMock)
    );

    userRepositoryMock.delete.mockResolvedValue(undefined);

    await deleteUserUseCase.execute("1");

    expect(userRepositoryMock.delete).toHaveBeenCalledWith("1");
  });
});
