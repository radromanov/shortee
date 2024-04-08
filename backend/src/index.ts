import express from "express";
import ShortURL from "./api/short-url/ShortURL";

const app = express();

app.get("/", (_req, res) => {
  const test = new ShortURL();
  res.json({ message: "Hello world!" });
});

app.listen(3001, () => console.log("Server running on port 3001"));
