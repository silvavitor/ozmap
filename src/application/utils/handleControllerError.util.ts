import { ZodError } from "zod";
import { HttpStatus } from "../enums/httpStatus.enum";
import { ControllerResponse } from "../types/controllerResponse.type";

export function handleControllerError(error: any): ControllerResponse {
  console.log(error);
  if (error instanceof ZodError) {
    return {
      statusCode: HttpStatus.BAD_REQUEST,
      body: {
        errors: error.issues.map((issue) => ({
          message: `${issue.path[0]}: ${issue.message}`,
        })),
      },
    };
  }

  console.error(error);

  return {
    statusCode: error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR,
    body: {
      errors: [{ message: error.message || "Unexpected Error" }],
    },
  };
}
