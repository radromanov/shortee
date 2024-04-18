import { NextFunction, Request, Response } from "express";

export const isAuthed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authed = false;

  await req.sessionStore.get(`sid ${req.sessionID}`, (err, session) => {
    if (err) return next(err);

    console.log("SESSION FROM STORE", session);

    if (!session) authed = false;
    else authed = true;
  });

  console.log(authed);

  if (!authed) {
    return res.status(401).json({ authed });
  } else {
    return next();
  }
};
