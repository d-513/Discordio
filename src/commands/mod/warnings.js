import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import knex from "../../database";
import forEach from "p-each-series";

export default class WarningsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "warnings",
      group: "mod",
      memberName: "warnings",
      description: "Lists the warnings of a member.",
      args: [
        {
          key: "member",
          type: "member",
          prompt: "What member do you want to see warnings for?",
        },
      ],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { member }) {
    const warns = await knex("warnings")
      .where({ user: member.user.id, guild: message.guild.id })
      .select("*");
    async function buildEmbed(id, warnedby, reason) {
      const embed = new MessageEmbed();
      embed.setColor("BLACK");
      embed.setTitle(`Warning ID: ${id}`);
      embed.addField("User", `<@${member.user.id}>`);
      embed.addField("Warned by", `<@${warnedby}>`);
      embed.addField("Reason", reason);
      return await message.embed(embed);
    }
    await forEach(warns, async (warn) => {
      await buildEmbed(warn.id, warn.warnedby, warn.reason);
    });
    return message.say(`Done listing warnings (${warns.length})`);
  }
}
