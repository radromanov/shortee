import express from "express";
import ShortURL from "./api/short-url/ShortURL";
import Config from "./core/Config";
import ID from "./api/id/id";
import { db } from "../db/schema/urls";

const app = express();
const envConfig = new Config();
const idManager = new ID(envConfig, db);
const shorty = new ShortURL(idManager);

app.get("/", async (_req, res) => {
  await shorty.insertOne({
    name: "Google",
    original: "https://www.google.com",
    ownerId: "123456789012",
    short: await idManager.insertOne(),
  });

  res.json({ message: "Hello world!" });
});

app.get("/delete", async (req, res) => {
  const id = req.query.id as string;

  console.log(id);

  console.log(await shorty.deleteOne(id));

  res.json({ message: `Deleted ${id}` });
});

app.listen(3001, () => console.log("Server running on port 3001"));
