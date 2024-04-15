import { Express, Router } from "express";
import { asyncErrorHandler } from "../../utils";

export default class ShortURLModule {
  private readonly PREFIX = "/short-url";
  private router: Router;

  constructor(private readonly app: Express) {
    this.router = Router();
  }

  init() {
    this.routes();

    return { prefix: this.PREFIX, controller: this.router };
  }

  private routes() {
    this.router.post(
      "/",
      asyncErrorHandler(async (req, res) => {
        const payload = req.body;

        res.status(201).json(payload);
      })
    );

    this.app.use(this.PREFIX, this.router);
  }
}
