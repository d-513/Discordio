import * as config from "../configuration";
import { CommandoClient } from "discord.js-commando";
import path from "path";
import ls from "log-symbols";
import "../webui/server";
console.log(ls.info, "Launching discordio");

const client = new CommandoClient(config.bot);

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["debug", "Debugging"],
    ["mod", "Moderation"],
    ["audio", "Audio"],
  ])
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
