import { NextFunction, Request, Response } from "express";

export const isAuthed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let authed = false;

  await req.sessionStore.get(req.sessionID, (err, session) => {
    if (err) return next(err);

    if (!session) authed = false;
    else authed = true;
  });

  if (!authed) {
    return res.status(401).send({ message: "Unauthorized", status: 401 });
  } else {
    //@ts-ignore
    console.log(req.session.user);
    //@ts-ignore
    return res.status(200).send(req.session.user);
  }
};
