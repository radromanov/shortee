import express from "express";
import ShortURL from "./api/short-url/ShortURL";
import Config from "./core/Config";
import ID from "./api/id/id";
import { db } from "../db/schema/urls";
import ExceptionMiddleware from "./api/exception/Exception.middleware";
import NotFoundMiddleware from "./api/exception/NotFound.middleware";
import Exception from "./core/Exception";
import { asyncErrorHandler } from "./utils/asyncErrorHandler";

const app = express();
const envConfig = new Config();
const idManager = new ID(envConfig, db);
const shorty = new ShortURL(envConfig, idManager);

app.get("/", async (_req, res) => {
  await shorty.insertOne({
    name: "Google",
    original: "https://www.google.com",
    ownerId: "123456789012",
  });

  res.json({ message: "Hello world!" });
});

app.get(
  "/error",
  asyncErrorHandler(async (_req, _res, _next) => {
    throw new Exception("Test error", "Bad Gateway");
  })
);

app.get("/delete", async (req, res) => {
  const id = req.query.id as string;

  console.log(id);

  console.log(await shorty.deleteOne(id));

  res.json({ message: `Deleted ${id}` });
});

app.all("*", NotFoundMiddleware);

app.use(ExceptionMiddleware);

app.listen(3001, () => console.log("Server running on port 3001"));
