import { Router, Express } from "express";
import UserController from "./user.controller";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler";
import { isAuthed } from "../../utils/isAuthed";

export default class UserModule {
  private readonly PREFIX = "/user";
  private router: Router;

  constructor(
    private readonly app: Express,
    private readonly controller: UserController = new UserController()
  ) {
    this.router = Router();
  }

  init() {
    this.routes();

    return { prefix: this.PREFIX, controller: this.router };
  }

  private routes() {
    this.router.get("/", isAuthed, (req, res) => {
      res.sendStatus(req.sessionID ? 200 : 401);
    });

    this.router.post(
      "/sign-up",
      asyncErrorHandler(async (req, res) =>
        this.controller.handleSignUp(req, res)
      )
    );

    this.app.use(this.PREFIX, this.router);
  }
}
