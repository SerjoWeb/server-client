export class ApiError extends Error {
  status: number;
  errors: any;

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);

    this.status = status;
    this.errors = errors;
  };

  static unauthorized(errors: any[] = []) {
    return new ApiError(401, "User is not authorized", errors);
  };

  static badRequest(message: string, errors: any[] = []) {
    return new ApiError(400, message, errors);
  };
};
