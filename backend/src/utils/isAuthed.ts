import { NextFunction, Request, Response } from "express";

export const isAuthed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authed = false;

  await req.sessionStore.get(`sid ${req.sessionID}`, (err, session) => {
    if (err) return next(err);

    if (!session) authed = false;
    else authed = true;
  });

  if (!authed) {
    return res.status(401).json({ authed: false });
  } else {
    return next();
  }
};
