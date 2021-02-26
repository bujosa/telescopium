export interface ICustomError {
  statusCode: number;
  serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
