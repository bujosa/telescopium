import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  serializeErrors() {
    return [{ message: "" }];
  }
}
