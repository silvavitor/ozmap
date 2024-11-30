import { ErrorResponse } from "./errorResponse.type";

export type ControllerResponse<Body = null> = {
  statusCode: number;
  body: Body | ErrorResponse;
};
