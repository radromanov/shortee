import { Router, Express } from "express";

export default class UserModule {
  private PREFIX = "/user" as const;
  private router: Router;

  constructor(private readonly app: Express) {
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

    this.app.use(this.PREFIX, this.router);
  }
}
