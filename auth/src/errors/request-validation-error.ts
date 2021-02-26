import { ValidationError } from "express-validator";
import { ICustomError } from "../interfaces/custom-error.interface";

export class RequestValidationError extends Error implements ICustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super();
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
