export class CustomBaseError extends Error {
  statusCode: number;
  constructor(message = "Error") {
    super(message);
    Error.captureStackTrace(this, this.constructor);
  }
}
