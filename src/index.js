import dotenv from "dotenv";
dotenv.config();

import {app} from "./app.js"

import connectDb from "./db/db.js";
connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Example app listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed", err);
  });
