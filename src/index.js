import * as config from "../configuration";
import { CommandoClient, SQLiteProvider } from "discord.js-commando";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import path from "path";
import ls from "log-symbols";
import knex from "./database";

const client = new CommandoClient(config.bot);
sqlite
  .open({
    filename: config.db.connection.filename,
    driver: sqlite3.Database,
  })
  .then((db) => {
    client.setProvider(new SQLiteProvider(db));
  });

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["debug", "Debugging"],
    ["mod", "Moderation"],
    ["audio", "Audio"],
    ["config", "Configuration"],
    ["covid", "Up-to-date coronavirus information"],
    ["minecraft", "Minecraft Utilities"],
    ["hypixel", "Hypixel minecraft server utils"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", async () => {
  client.user.setPresence({ status: "online" });
  if (!(await knex.schema.hasTable("warnings"))) {
    await knex.schema.createTable("warnings", (t) => {
      t.increments("id");
      t.string("guild");
      t.string("user");
      t.string("warnedby");
      t.string("reason");
    });
  }
  if (!(await knex.schema.hasTable("warnActions"))) {
    await knex.schema.createTable("warnActions", (t) => {
      t.increments("id");
      t.string("guild");
      t.integer("count");
      t.string("action");
    });
  }
  if (!(await knex.schema.hasTable("muteRoles"))) {
    await knex.schema.createTable("muteRoles", (t) => {
      t.increments("id");
      t.string("guild");
      t.string("roleid");
    });
  }
  if (!(await knex.schema.hasTable("mcServIcons"))) {
    await knex.schema.createTable("mcServIcons", (t) => {
      t.increments("id");
      t.string("ip");
      t.string("url");
    });
  }
  console.log(
    ls.success,
    `Logged in as ${client.user.tag}! (${client.user.id})`
  );
  console.log(
    ls.success,
    `https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
  );
  client.user.setActivity(config.bot.status);
});

client.on("error", console.error);
client.login(config.token);

process.on("SIGINT", () => {
  console.log("ded");
  client.user
    .setPresence({ status: "invisible" })
    .then(() => process.exit())
    .catch(() => process.exit());
});
