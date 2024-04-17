import { Router, Express } from "express";
import UserController from "./user.controller";
import { asyncErrorHandler } from "../../utils/asyncErrorHandler";

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
    this.router.get(
      "/:id",
      asyncErrorHandler(async (req, res) => this.controller.handleGet(req, res))
    );

    this.router.post(
      "/sign-up",
      asyncErrorHandler(async (req, res) =>
        this.controller.handleSignUp(req, res)
      )
    );

    this.router.post(
      "/login",
      asyncErrorHandler(async (req, res) =>
        this.controller.handleLogin(req, res)
      )
    );

    this.router.post(
      "/logout",
      asyncErrorHandler(async (req, res) =>
        this.controller.handleLogout(req, res)
      )
    );

    this.app.use(this.PREFIX, this.router);
  }
}
