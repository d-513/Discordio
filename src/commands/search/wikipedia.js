import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import * as wikipedia from "@dada513/wikipedia-search";
import loadingEmbed from "../../apis/loadingembed";

export default class WikipediaCommand extends Command {
  constructor(client) {
    super(client, {
      name: "wikipedia",
      group: "search",
      memberName: "wikipedia",
      description: "Searches a term with wikipedia.",
      aliases: ["wiki", "w", "searchwp", "wikipediaget"],
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
    const links = await wikipedia.search(query);
    const embed = new MessageEmbed()
      .setAuthor("Wikipedia", "https://i.imgur.com/XMYT60b.png")
      .setColor("WHITE");
    links.forEach((link) => embed.addField(link.title, link.url));
    return msg.edit("", embed);
  }
}
