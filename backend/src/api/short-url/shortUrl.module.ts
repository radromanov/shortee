import { Express, Router } from "express";
import { asyncErrorHandler, isAuthed } from "../../utils";
import ShortURLController from "./shortUrl.controller";

export default class ShortURLModule {
  private readonly PREFIX = "/short-url";
  private router: Router;

  constructor(
    private readonly app: Express,
    private readonly controller: ShortURLController = new ShortURLController()
  ) {
    this.router = Router();
  }

  init() {
    this.routes();

    return { prefix: this.PREFIX, controller: this.router };
  }

  private routes() {
    this.router
      .post(
        "/",
        asyncErrorHandler(isAuthed),
        asyncErrorHandler(
          async (req, res) => await this.controller.handleCreate(req, res)
        )
      )
      .get(
        "/",
        asyncErrorHandler(isAuthed),
        asyncErrorHandler(
          async (req, res) => await this.controller.handleGetAll(req, res)
        )
      );

    this.app.use(this.PREFIX, this.router);
  }
}
