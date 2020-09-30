console.log("Launching discordio");
import { CommandoClient } from "discord.js-commando";
import path from "path";
import * as config from "../configuration";
import fs from "fs-extra";

const client = new CommandoClient(config.bot);

const groupFile = removeEmptyLine(fs.readFileSync("./cmdgroups.md", "utf8"));
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
  console.log(`Logged in as ${client.user.tag}! (${client.user.id})`);
  console.log(
    `Invite: https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8`
  );
  client.user.setActivity("with Commando");
});

client.on("error", console.error);
client.login(config.token);

function removeEmptyLine(text) {
  return text.replace(/(\r\n|\n|\r)/gm, "");
}
