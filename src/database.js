import knexdb from "knex";
import * as config from "./configuration";
import fs from "fs-extra";

fs.ensureDirSync("data");
const knex = knexdb(config.db);
export default knex;
