import { Request, Response, NextFunction } from "express";

export const asyncErrorHandler =
  <T>(func: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
  (req: Request, res: Response, next: NextFunction) =>
    func(req, res, next).catch((error) => next(error));
