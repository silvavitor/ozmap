import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class UserNotFoundError extends CustomBaseError {
  name = "UserNotFoundError";
  statusCode = HttpStatus.NOT_FOUND;
}
