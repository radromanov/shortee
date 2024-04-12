import { Router, Express } from "express";
import User from "./User";

export default class UserModule {
  private PREFIX = "/user" as const;
  private router: Router;

  constructor(
    private readonly app: Express,
    private readonly userManager: User
  ) {
    this.router = Router();
  }

  init() {
    this.routes();

    return { prefix: this.PREFIX, controller: this.router };
  }

  private routes() {
    this.router.get("/", (req, res) => {
      res.json({ message: `User ${req.originalUrl} route` });
    });

    this.router.post("/sign-up", async (req, res) => {
      const payload = req.body;

      const user = await this.userManager.insertOne(payload);

      res.json(user);
    });

    this.app.use(this.PREFIX, this.router);
  }
}
