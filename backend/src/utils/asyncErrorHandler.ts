import { Request, Response, NextFunction } from "express";

export const asyncErrorHandler =
  (func: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) =>
    func(req, res, next).catch((error) => next(error));
