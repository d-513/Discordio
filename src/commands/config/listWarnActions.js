import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import forEach from "p-each-series";
import knex from "../../database";

export default class ListWarnActionsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "listwarnactions",
      group: "config",
      memberName: "listwarnactions",
      description: "Lists current warn actions",
      userPermissions: ["ADMINISTRATOR"],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    const actions = await knex("warnActions")
      .where({ guild: message.guild.id })
      .select();
    const iterator = async (action) => {
      const embed = new MessageEmbed()
        .setTitle(`action - warning count ${action.count}`)
        .setDescription(
          `On ${action.count} warnings, ${action.action} the member.`
        );
      await message.embed(embed);
    };
    await forEach(actions, iterator);
  }
}
