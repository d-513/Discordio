import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class RemoveWarnActionCommand extends Command {
  constructor(client) {
    super(client, {
      name: "removewarnaction",
      group: "config",
      memberName: "removewarnaction",
      description: "removes an actions when a user is warned x times",
      args: [
        {
          key: "count",
          type: "integer",
          prompt:
            "What is the number of warnings for the action that should be removed?",
        },
      ],
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { count }) {
    const actions = await knex("warnActions")
      .where({ guild: message.guild.id, count })
      .select();
    if (actions.length === 0) {
      return message.say(`There is no action for ${count} warnings.`);
    }
    await knex("warnActions")
      .where({
        guild: message.guild.id,
        count,
      })
      .delete();
    return message.say(
      `Successfully removed warn action when user reaches ${count} warnings`
    );
  }
}
