import { Request, Response, NextFunction } from "express";
import Exception from "../../core/Exception";

export default function ExceptionMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Exception) {
    return res.status(err.status).send(err.serialize());
  }

  return res.status(500).json({
    message: err.message || "Something went wrong",
    status: 500,
    exception: "Internal Server Error",
    stack: {},
  });
}
