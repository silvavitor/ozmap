import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class AddressOrCoordinatesMustBeProvidedError extends CustomBaseError {
  name = "AddressOrCoordinatesMustBeProvidedError";
  statusCode = HttpStatus.BAD_REQUEST;
}
