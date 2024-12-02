import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class OnlyAddressOrCoordinatesMustBeProvidedError extends CustomBaseError {
  name = "OnlyAddressOrCoordinatesMustBeProvidedError";

  message = "only address or coordinates must be provided";
  statusCode = HttpStatus.BAD_REQUEST;
}
