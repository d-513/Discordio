import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import corona from "../../apis/corona";

export default class CovCountryStatsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "covcountry",
      group: "covid",
      memberName: "covcountry",
      description: "COVID-19 stats, per country.",
      args: [
        {
          key: "country",
          type: "string",
          prompt: "Which country would you like to get stats for?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { country }) {
    try {
      const stats = await corona.country(country);
      const embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("Global COVID-19 totals")
        .addField("Total cases", stats.cases)
        .addField("Total deaths", stats.deaths)
        .addField("Total recovered", stats.recovered)
        .addField("Cases today", stats.todayCases)
        .addField("Deaths today", stats.todayDeaths);
      return message.embed(embed);
    } catch (ignore) {
      throw "Error getting covid stats";
    }
  }
}
