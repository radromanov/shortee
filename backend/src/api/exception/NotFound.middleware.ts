import { Request, Response, NextFunction } from "express";
import Exception from "../../core/Exception";

export default function NotFoundMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  next(new Exception(`Page ${req.originalUrl} not found.`, "Not Found"));
}
