import { NextFunction, Request, Response } from "express";

export const isAuthed = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  console.log(req.session);
  console.log(req.sessionID);

  // @ts-ignore
  req.session.user = {
    id: "12345",
    username: "rads",
    email: "rads@gmail.com",
  };

  req.sessionStore.createSession(req, req.session);

  let authed = false;

  console.log(req.sessionID);

  await req.sessionStore.get(`sid ${req.sessionID}`, (err, session) => {
    if (err) throw err;

    console.log("HERE", session?.cookie);

    if (!session) authed = false;
    else authed = true;
  });

  console.log(authed ? "Logged in" : "Not logged in");

  next();
};
