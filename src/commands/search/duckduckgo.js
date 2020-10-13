import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import * as duckduckgo from "@dada513/duckduckscrape";
import loadingEmbed from "../../apis/loadingembed";

export default class DuckDuckGoCommand extends Command {
  constructor(client) {
    super(client, {
      name: "duckduckgo",
      group: "search",
      aliases: ["ddg"],
      memberName: "duckduckgo",
      description: "DuckDuckGo's a search term.",
      args: [
        {
          key: "query",
          type: "string",
          prompt: "What would you like to search for?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { query }) {
    const msg = await message.embed(loadingEmbed());
    const links = await duckduckgo.search(query);
    const embed = new MessageEmbed()
      .setAuthor("DuckDuckGo", "https://i.imgur.com/XSgVU2D.png")
      .setColor("ORANGE");
    links.slice(0, 11).forEach((link) => embed.addField(link.title, link.url));
    return msg.edit("", embed);
  }
}
