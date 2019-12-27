import * as express from "express";
import * as path from "path";
import * as mongoose from "mongoose";
import { Server } from "http";

import api from "../routes/api";

export async function start() {
  const app = express();
  //production mode
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../client/build")));
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../../client/build/index.html"));
    });
  } else if (process.env.NODE_ENV === "development") {
    // For logging
    app.use("/api", (req, res, next) => {
      console.log(`[${req.method}] ${req.originalUrl}`);
      next();
    });
  }

  // API Обработчики запросов
  app.use("/api", api);

  // Обработчик ошибок
  app.use(function(err, req, res, next) {
    if (!err.status) console.error(err.stack);
    res.status(err.status || 500).send({ error: err.status ? err.message : "internal error" });
  });

  const port = Number(process.env.PORT) || 5000;
  const server = app.listen(port, () => {
    console.log(`Server listening at ${port} port`);
  });

  mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("MongoDB connected");
    })
    .catch(err => console.error(err.message));
}
