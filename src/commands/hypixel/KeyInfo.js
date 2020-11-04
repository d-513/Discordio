import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import * as config from "../../configuration";
import hypixel from "hypixel-api-wrapper";
import loadingEmbed from "../../apis/loadingembed";
hypixel.setKey(config.hypixelToken);

export default class HypixelKeyInfoBoostersCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hkeyinfo",
      group: "hypixel",
      aliases: ["hki", "hkey"],
      memberName: "hkeyinfo",
      description: "Shows some info about the current API key.",
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    if (!config.hypixelToken) {
      return message.say(`The bot owner did not provide a hypixel api key.`);
    }
    const msg = await message.embed(loadingEmbed());
    const key = await hypixel.keyInfo();
    const embed = new MessageEmbed()
      .setTitle("API key")
      .setColor("ORANGE")
      .addField("Owner", key.record.owner)
      .addField("Request limit per minute", key.record.limit)
      .addField("Queries in the past minute", key.record.queriesInPastMin)
      .addField("Total queries", key.record.totalQueries);
    return msg.edit(embed);
  }
}
