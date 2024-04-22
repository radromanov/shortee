import { Router, Express } from "express";
import { isAuthed } from "../../utils/isAuthed";
import { asyncErrorHandler } from "../../utils";
import AuthController from "./auth.controller";

export default class AuthModule {
  private readonly PREFIX = "/auth";
  private router: Router;

  constructor(
    private readonly app: Express,
    private readonly controller: AuthController = new AuthController()
  ) {
    this.router = Router();
  }

  init() {
    this.routes();

    return { prefix: this.PREFIX, controller: this.router };
  }

  private routes() {
    this.router.get(
      "/",
      isAuthed,
      asyncErrorHandler(async (req, res) =>
        this.controller.handleSession(req, res)
      )
    );

    this.router.post(
      "/login",
      asyncErrorHandler(async (req, res) =>
        this.controller.handleLogin(req, res)
      )
    );

    this.router.get(
      "/logout",
      isAuthed,
      asyncErrorHandler(async (req, res) =>
        this.controller.handleLogout(req, res)
      )
    );

    this.app.use(this.PREFIX, this.router);
  }
}
