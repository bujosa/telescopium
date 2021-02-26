import { ICustomError } from "../interfaces/custom-error.interface";

export class DatabaseConnectionError extends Error implements ICustomError {
  statusCode = 500;
  reason = "Error connecting to database";

  constructor() {
    super();

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
