import * as config from "../configuration";
import { CommandoClient } from "discord.js-commando";
import path from "path";
import fs from "fs-extra";
import ls from "log-symbols";
import "../webui/server";
console.log(ls.info, "Launching discordio");

const client = new CommandoClient(config.bot);

const groupFile = fs.readFileSync("./cmdgroups.md", "utf8");
const groups = [];
groupFile
  .split("\n")
  .forEach((line) => groups.push([line.split("|")[0], [line.split("|")[1]]]));

client.registry
  .registerDefaultTypes()
  .registerGroups(groups)
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commands"));

client.once("ready", () => {
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
