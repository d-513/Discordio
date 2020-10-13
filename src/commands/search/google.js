import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import serp from "serp";
import loadingEmbed from "../../apis/loadingembed";

export default class GoogleCommand extends Command {
  constructor(client) {
    super(client, {
      name: "google",
      group: "search",
      memberName: "google",
      description: "Googles a search term.",
      aliases: ["ggl"],
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
    const opts = {
      host: "google.com",
      qs: {
        q: query,
      },
      num: 10,
    };
    const links = await serp.search(opts);
    const embed = new MessageEmbed()
      .setAuthor("Google", "https://i.imgur.com/dcJhYDu.png")
      .setColor("RED");
    links.forEach((link) => embed.addField(link.title, link.url));
    return msg.edit("", embed);
  }
}
