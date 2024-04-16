import { Express, Router } from "express";
import { asyncErrorHandler } from "../../utils";
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
      async (req, res, next) => {
        console.log(res.getHeaders());
        console.log(req.headers);
        next();
      },
      asyncErrorHandler(async (req, res) => {
        const payload = req.body;

        res.status(201).json(payload);
      })
    );

    this.app.use(this.PREFIX, this.router);
  }
}
