import YAML from "yaml";
import fs from "fs-extra";
import ls from "log-symbols";

export const config = YAML.parse(fs.readFileSync("./config.yml", "utf8"));

if (config.version === 1) {
  console.log(ls.info, "[upgrader] did not migrate, config version is latest");
}

export const token = config.bot.token;
export const imgurToken = config.external.apis.imgur_key;

export const hypixelToken = config.external.apis.hypixel_key;
export const bot = config.bot;

export const db = config.database;
export const lavaLinkNodes = config.lavaNodes;
