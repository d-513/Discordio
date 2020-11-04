import * as config from "./configuration";
import { CommandoClient, SQLiteProvider } from "discord.js-commando";
import * as sqlite from "sqlite";
import sqlite3 from "sqlite3";
import { LavaClient } from "@anonymousg/lavajs";
import path from "path";
import ls from "log-symbols";
import knex from "./database";

export const client = new CommandoClient(config.bot);
/**
 * @type {LavaClient}
 */
export let lavaClient;
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
    ["suggestions", "Suggestions"],
    ["search", "Search Engines"],
    ["fun", "Fun"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", async () => {
  // Voice
  lavaClient = new LavaClient(client, config.lavaLinkNodes);
  lavaClient.on("nodeError", (err) => {
    console.error(ls.error, "Could not connect to lava node", err.toString());
  });

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
  if (!(await knex.schema.hasTable("suggestionChannels"))) {
    await knex.schema.createTable("suggestionChannels", (t) => {
      t.increments("id");
      t.string("guild");
      t.string("channelid");
    });
  }
  if (!(await knex.schema.hasTable("suggestions"))) {
    await knex.schema.createTable("suggestions", (t) => {
      t.increments("id");
      t.string("guild");
      t.string("messageid");
      t.string("content");
      t.string("author_tag");
      t.string("author_avatar");
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

console.log(ls.info, "Logging in...");
client.on("error", console.error);
client.login(config.token);

process.on("uncaughtException", (err) => {
  console.log(ls.error, "[exceptionCatcher]", "Saved procses from dying:", err);
});
