import express from "express";
import ShortURL from "./api/short-url/ShortURL";
import Database from "./core/Database";
import Config from "./core/Config";

const app = express();
const db = new Database(new Config());

app.get("/", async (_req, res) => {
  const shorty = new ShortURL("https://www.google.com", "Google");

  console.log(shorty.get());
  db.close();

  res.json({ message: "Hello world!" });
});

app.listen(3001, () => console.log("Server running on port 3001"));
