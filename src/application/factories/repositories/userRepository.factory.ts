import { UserRepository } from "../../repositories/user.repository";

export function makeUserRepository() {
  return new UserRepository();
}
