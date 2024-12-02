import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class NotFoundError extends CustomBaseError {
  name = "NotFoundError";
  statusCode = HttpStatus.NOT_FOUND;
}
