import { Express, Router } from "express";
import { asyncErrorHandler, isAuthed } from "../../utils";
import Auth from "../auth/Auth";

export default class ShortURLModule {
  private readonly PREFIX = "/short-url";
  private router: Router;

  constructor(
    private readonly app: Express,
    private readonly auth: Auth = new Auth()
  ) {
    this.router = Router();
  }

  init() {
    this.routes();

    return { prefix: this.PREFIX, controller: this.router };
  }

  private routes() {
    this.router.post(
      "/",
      asyncErrorHandler(isAuthed),
      asyncErrorHandler(async (req, res) => {
        const payload = req.body;

        console.log(payload);

        res.status(201).send(payload);
      })
    );

    this.app.use(this.PREFIX, this.router);
  }
}
