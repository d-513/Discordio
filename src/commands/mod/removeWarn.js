import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class RemoveWarnCommand extends Command {
  constructor(client) {
    super(client, {
      name: "removewarn",
      group: "mod",
      memberName: "removewarn",
      description: "Removes a warning from a member.",
      guildOnly: true,
      args: [
        {
          key: "warnid",
          type: "integer",
          prompt:
            "ID of the warning to remove (use ?warns @member to view warnings and their IDs)",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { warnid }) {
    const where = {
      id: warnid,
      guild: message.guild.id,
    };
    const [warn] = await knex("warnings").where(where).select();
    if (!warn) {
      return message.say(`No warning with id ${warnid} found in this guild.`);
    }
    await knex("warnings").where(where).delete();
    return message.say(`Removed warning ${warnid}`);
  }
}
