import { Command, CommandoMessage } from "discord.js-commando";

export default class PurgeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "purge",
      group: "mod",
      memberName: "purge",
      aliases: ["cleanup", "clear"],
      description: "Purges a number of messages from a channel.",
      args: [
        {
          key: "amount",
          type: "integer",
          prompt: "How many messages do you want to delete?",
        },
      ],
      guildOnly: true,
      userPermissions: ["MANAGE_MESSAGES"],
      clientPermissions: ["MANAGE_MESSAGES"],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { amount }) {
    await message.channel.bulkDelete(amount, true);
    return message.say("Success");
  }
}
