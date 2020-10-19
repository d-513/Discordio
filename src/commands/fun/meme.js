import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import imageapi from "imageapi.js";
import loadingEmbed from "../../apis/loadingembed";

export default class MemeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "meme",
      group: "fun",
      memberName: "meme",
      description: "Gets a random meme from reddit.",
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    const msg = await message.embed(loadingEmbed());
    const img = await imageapi("memes");
    const embed = new MessageEmbed()
      .setAuthor("r/memes", "https://i.imgur.com/bcxwh4B.png")
      .setImage(img)
      .setFooter(
        "User-Generated Content - From Reddit",
        "https://i.imgur.com/i8yFq9c.png"
      );
    return msg.edit(embed);
  }
}
