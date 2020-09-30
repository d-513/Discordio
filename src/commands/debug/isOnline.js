const { Command } = require("discord.js-commando");

module.exports = class IsOfflineCommand extends Command {
  constructor(client) {
    super(client, {
      name: "isoffline",
      group: "debug",
      memberName: "isoffline",
      description: "Tests if the bot is online.",
      userPermissions: ["ADMINISTRATOR"],
    });
  }
  run(message) {
    return message.say("Working!");
  }
};
