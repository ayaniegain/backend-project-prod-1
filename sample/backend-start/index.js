import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import cors from "cors";
app.use(cors());

let jokes = [
  {
    joke: "Why couldn't the bicycle find its way home? It lost its bearings!",
    author: "mike L",
    time: "2021-10-13T08:00:00Z",
  },
  {
    joke: "I told my wife she should embrace her mistakes. She gave me a hug.",
    author: "Goinea",
    time: "2021-10-13T09:30:00Z",
  },
  {
    joke: "Why don't scientists trust atoms? Because they make up everything!",
    author: "Herny M",
    time: "2021-10-13T11:15:00Z",
  },
];

const port = process.env.PORT || 8000;

app.get("/api/", (req, res) => {
  res.send(jokes);
});

app.get("/twitter", (req, res) => {
  res.send("twitter !");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
