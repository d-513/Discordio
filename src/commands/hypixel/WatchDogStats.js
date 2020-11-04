import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import * as config from "../../configuration";
import hypixel from "hypixel-api-wrapper";
import loadingEmbed from "../../apis/loadingembed";
hypixel.setKey(config.hypixelToken);

export default class WatchDogStatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hwatchdogstats",
      group: "hypixel",
      aliases: ["hwds"],
      memberName: "hwatchdogstats",
      description: "Gets the stats of hypixel's anti-cheat, watchdog.",
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
    const stats = await hypixel.getWatchdogStats();
    const embed = new MessageEmbed()
      .setTitle("Watchdog stats")
      .setColor("RED")
      .setThumbnail("https://i.imgur.com/jHVCuGm.png")
      .addField("Total watchdog bans", stats.watchdog_total)
      .addField("Total staff bans", stats.staff_total);
    return msg.edit(embed);
  }
}
