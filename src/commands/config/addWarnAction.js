import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class addWarnActionCommand extends Command {
  constructor(client) {
    super(client, {
      name: "addwarnaction",
      group: "config",
      memberName: "addwarnaction",
      description: "Adds an actions when a user is warned x times",
      args: [
        {
          key: "count",
          type: "integer",
          prompt: "What is the number of warnings for the action to execute?",
        },
        {
          key: "action",
          type: "string",
          prompt: "What action should be executed? (kick, ban, mute)",
          oneOf: ["kick", "ban", "mute"],
        },
      ],
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { count, action }) {
    const actions = await knex("warnActions")
      .where({ guild: message.guild.id, count })
      .select();
    if (actions.length !== 0) {
      return message.say(
        `There is already an action for ${count} warnings. Delete it with \`${this.client.commandPrefix}deletewarnaction ${count}\``
      );
    }
    await knex("warnActions").insert({
      guild: message.guild.id,
      count,
      action,
    });
    return message.say(
      `Successfully added a \`${action}\` action when user reaches ${count} warnings`
    );
  }
}
