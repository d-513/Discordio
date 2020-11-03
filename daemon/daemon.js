import * as config from "../configuration";
import express from "express";
import { client } from "../src/index";
import ls from "log-symbols";

const app = express();

app.listen(config.daemon.port, () => {
  console.log(ls.success, `Web daemon started on ${config.daemon.port}`);
});
