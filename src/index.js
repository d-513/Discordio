import * as config from "../configuration";
import { CommandoClient } from "discord.js-commando";
import path from "path";
import ls from "log-symbols";
import knex from "./database";

const client = new CommandoClient(config.bot);

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["debug", "Debugging"],
    ["mod", "Moderation"],
    ["audio", "Audio"],
    ["config", "Configuration"],
    ["covid", "Up-to-date coronavirus information"],
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
