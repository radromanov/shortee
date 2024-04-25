import express, { Router, Express } from "express";
import session from "express-session";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import UserModule from "../api/user/user.module";
import NotFoundMiddleware from "../api/exception/NotFound.middleware";
import ExceptionMiddleware from "../api/exception/Exception.middleware";
import Config from "./Config";
import ShortURLModule from "../api/short-url/shortUrl.module";
import Cache from "./Cache";
import AuthModule from "../api/auth/auth.module";

export default class Application {
  private router: Router;

  constructor(
    private readonly app: Express,
    private readonly config: Config = new Config(),
    private readonly cache: Cache = new Cache()
  ) {
    this.router = Router();
  }

  initialize() {
    const { NODE_ENV, PORT, DOMAIN } = this.config.get();

    const userRoutes = new UserModule(this.app).init();
    const urlRoutes = new ShortURLModule(this.app).init();
    const authRoutes = new AuthModule(this.app).init();

    this.setup();
    this.modules([userRoutes, urlRoutes, authRoutes]);

    // Handles initial client short link redirect to the api - this is what the user opens via the client app or a copied link
    this.app.get("/:id", (req, res) => {
      res.redirect(
        302,
        NODE_ENV === "development"
          ? `http://localhost:${PORT}/api/v1/short-url${req.originalUrl}`
          : `${DOMAIN}/api/v1/short-url${req.originalUrl}`
      );
    });

    this.app.all("*", NotFoundMiddleware);
    this.app.use(ExceptionMiddleware);

    return this.app;
  }

  start() {
    const { PORT, NODE_ENV } = this.config.get();

    return this.app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}, in ${NODE_ENV} mode.`)
    );
  }

  private setup() {
    const { MORGAN, DOMAIN, NODE_ENV } = this.config.get();

    this.app.use(morgan(MORGAN));
    this.app.use(helmet());
    this.app.use(
      cors({
        origin: NODE_ENV === "development" ? "http://localhost:5173" : DOMAIN,
        credentials: true,
      })
    );

    this.app.use(session(this.cache.init()));

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private modules(mods: { prefix: string; controller: Router }[]) {
    for (const mod of mods) {
      this.router.use(mod.prefix, mod.controller);
    }

    this.app.use("/api/v1", this.router);
  }
}
