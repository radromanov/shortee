import { NextFunction, Request, Response } from "express";
import Exception from "../core/Exception";

export const isAuthed = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  let authed = false;

  await req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) return next(new Exception("", "Unauthorized"));

    //@ts-ignore
    if (!session.user) authed = false;
    else authed = true;
  });

  //@ts-ignore
  req.authed = authed;

  next();
};
