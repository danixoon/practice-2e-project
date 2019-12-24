import * as express from "express";
import * as path from "path";
import * as socketIO from "socket.io";

import api from "../routes/api";

export function start() {
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

  // Routes
  app.use("/api", api);

  const port = Number(process.env.PORT) || 5000;
  const server = app.listen(port, async () => {
    console.log(`Server listening at ${port} port`);
  });
}
