import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class OnlyAddressOrCoordinatesMustBeProvidedError extends CustomBaseError {
  name = "OnlyAddressOrCoordinatesMustBeProvidedError";
  statusCode = HttpStatus.BAD_REQUEST;
}
