import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class RemoveSuggestionsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "removesuggestions",
      group: "config",
      memberName: "removesuggestions",
      description: "Removes the suggestion channel",
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    await knex("suggestionChannels")
      .where({
        guild: message.guild.id,
      })
      .delete();
    return message.say("Done!");
  }
}
