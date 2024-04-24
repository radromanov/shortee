import { Request, Response, NextFunction } from "express";
import Exception from "../../core/Exception";

export default function ExceptionMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof Exception) {
    if (err.status === 401) {
      res.clearCookie("connect.sid");
    }

    return res.status(err.status).send(err.serialize());
  }

  return res.status(500).send({
    message: err.message || "Something went wrong",
    status: 500,
    exception: "Internal Server Error",
    stack: {},
  });
}
