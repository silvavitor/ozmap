import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class EmailAlreadyExists extends CustomBaseError {
  name = "EmailAlreadyExists";
  statusCode = HttpStatus.BAD_REQUEST;
}
