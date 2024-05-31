import dotenv from "dotenv";
dotenv.config();

import connectDb from "./db/db.js";
connectDb();

import express from "express";
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
