import { userRepositoryMock } from "../../mocks/repositories/user.repository.mock";
import { FindUsersUseCase } from "./findUsers.useCase";

describe("FindUsersUseCase", () => {
  it("should format filter parameters and call repository with defaults", async () => {
    const filter = { name: "John Doe" };
    const mockUsers = { data: [], total: 0, skip: 0 };

    userRepositoryMock.findPaginated.mockResolvedValue(mockUsers);

    const findUsersUseCase = new FindUsersUseCase(userRepositoryMock);

    const result = await findUsersUseCase.execute(filter);

    expect(userRepositoryMock.findPaginated).toHaveBeenCalledWith({
      name: "John Doe",
      limit: 10,
      skip: 0,
    });
    expect(result).toEqual(mockUsers);
  });

  it("should use provided limit and skip values", async () => {
    const filter = { name: "Jane", limit: 5, skip: 10 };
    const mockUsers = { data: [], total: 0, skip: 0 };

    userRepositoryMock.findPaginated.mockResolvedValue(mockUsers);

    const findUsersUseCase = new FindUsersUseCase(userRepositoryMock);

    const result = await findUsersUseCase.execute(filter);

    expect(userRepositoryMock.findPaginated).toHaveBeenCalledWith({
      name: "Jane",
      limit: 5,
      skip: 10,
    });
    expect(result).toEqual(mockUsers);
  });

  it("should handle invalid limit and skip values by using defaults", async () => {
    const filter = { limit: NaN, skip: NaN };
    const mockUsers = { data: [], total: 0, skip: 0 };

    userRepositoryMock.findPaginated.mockResolvedValue(mockUsers);

    const findUsersUseCase = new FindUsersUseCase(userRepositoryMock);

    const result = await findUsersUseCase.execute(filter);

    expect(userRepositoryMock.findPaginated).toHaveBeenCalledWith({
      limit: 10,
      skip: 0,
    });
    expect(result).toEqual(mockUsers);
  });
});
