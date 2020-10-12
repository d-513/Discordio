import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class SetupSuggestionsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "setupsuggestions",
      group: "config",
      memberName: "setupsuggestions",
      description: "Sets up a suggestion channel",
      args: [
        {
          key: "channel",
          type: "channel",
          prompt: "Which channel do you want suggestions to be sent to?",
        },
      ],
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { channel }) {
    const suggestionChannels = await knex("suggestionChannels")
      .where({
        guild: message.guild.id,
      })
      .select();
    if (suggestionChannels.length !== 0) {
      return message.say(`There is already a suggestion channel set up for this server.
        - Remove it with \`${this.client.commandPrefix}removeSuggestions\``);
    }

    await knex("suggestionChannels").insert({
      guild: message.guild.id,
      channelid: channel.id,
    });

    return message.say("Done");
  }
}
