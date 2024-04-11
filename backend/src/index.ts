import express from "express";
import ShortURL from "./api/short-url/ShortURL";
import Config from "./core/Config";

const app = express();

app.get("/", async (_req, res) => {
  const shorty = new ShortURL("https://www.google.com", "Google");

  console.log(shorty.get());
  console.log(await shorty.insertOne());
  console.log(await shorty.getOne(shorty.getID()));

  res.json({ message: "Hello world!" });
});

app.listen(3001, () => console.log("Server running on port 3001"));
