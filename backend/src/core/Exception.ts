import Config from "./Config";

const EXCEPTION_TYPE = {
  "Bad Request": 400,
  Unauthorized: 401,
  Forbidden: 403,
  "Not Found": 404,
  "Method Not Allowed": 405,
  Conflict: 409,
  "Unprocessable Content": 422,
  "Internal Server Error": 500,
  "Not Implemented": 501,
  "Bad Gateway": 502,
} as const;

export default class Exception extends Error {
  message: string;
  exception: keyof typeof EXCEPTION_TYPE;
  status: (typeof EXCEPTION_TYPE)[keyof typeof EXCEPTION_TYPE];

  constructor(message: string, exception: keyof typeof EXCEPTION_TYPE) {
    super(message);
    Object.setPrototypeOf(this, Exception.prototype);
    Error.captureStackTrace(this, this.constructor);

    this.message = message;
    this.exception = exception;
    this.status = EXCEPTION_TYPE[exception];

    console.log(this.stack);
  }

  serialize() {
    const NODE_ENV = new Config().getOne("NODE_ENV");

    return {
      message: this.message,
      exception: this.exception,
      status: this.status,
      stack: NODE_ENV === "development" ? this.stack : {},
    };
  }
}
