import { HttpStatus } from "../enums/httpStatus.enum";
import { CustomBaseError } from "./customBaseError";

export class AddressOrCoordinatesMustBeProvidedError extends CustomBaseError {
  name = "AddressOrCoordinatesMustBeProvidedError";

  message = "address or coordinates muts be provided";
  statusCode = HttpStatus.BAD_REQUEST;
}
