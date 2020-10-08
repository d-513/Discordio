import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import corona from "../../apis/corona";

export default class CovStatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "covstats",
      group: "covid",
      memberName: "covstats",
      description: "Global stats of COVID-19",
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    try {
      const stats = await corona.total();
      const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Global COVID-19 totals")
        .addField("Total cases", stats.cases)
        .addField("Total deaths", stats.deaths)
        .addField("Total recovered", stats.recovered)
        .addField("Cases today", stats.todayCases)
        .addField("Deaths today", stats.todayDeaths)
        .addField("Last updated", stats.updated.toString());
      return message.embed(embed);
    } catch (ignore) {
      return message.say("Error getting covid stats");
    }
  }
}
