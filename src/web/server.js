import * as config from "../../configuration";
import express from "express";
import ls from "log-symbols";
export const app = express();

app.listen(config.web.port, () =>
  console.log(ls.success, "Web server listening on", config.web.port)
);
