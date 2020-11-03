import YAML from "yaml";
import fs from "fs-extra";
import ls from "log-symbols";

export const config = YAML.parse(fs.readFileSync("./config.yml", "utf8"));

if (config.version === 2) {
  console.log(ls.info, "[upgrader] did not migrate, config version is latest");
}

if (config.version === 1) {
  console.log(
    ls.warning,
    "[upgrader] config version is 1, launching [migratorJob]"
  );
  if (config.daemon) {
    console.log(
      ls.warning,
      "[upgrader] broken config, version is still 1, but has [daemon] field which was added in version 2"
    );
    console.log(
      ls.warning,
      "[upgrader] config upgrader will now exit, but please fix it manually."
    );
  } else {
    config.daemon = { port: 3500 };
    config.version = 2;
    fs.writeFileSync("./config.yml", YAML.stringify(config), "utf8");
  }
}

export const token = config.bot.token;
export const imgurToken = config.external.apis.imgur_key;

export const hypixelToken = config.external.apis.hypixel_key;
export const bot = config.bot;

export const db = config.database;
export const lavaLinkNodes = config.lavaNodes;

export const daemon = config.daemon;
