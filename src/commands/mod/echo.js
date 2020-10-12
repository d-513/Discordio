import { Command, CommandoMessage } from "discord.js-commando";

export default class EchoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "echo",
      group: "mod",
      memberName: "echo",
      description: "Sends a specified message to a channel.",
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
      args: [
        {
          key: "channel",
          type: "channel",
          prompt: "Which channel do you want to send the message to?",
        },
        {
          key: "echo",
          type: "string",
          prompt: "What message do you want to send?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { channel, echo }) {
    return channel.send(`${echo}\n*Sent by ${message.author.tag}*`);
  }
}
