import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import { getAvatar } from "@dada513/subreddit-avatar-image";
import imageapi from "imageapi.js";
import loadingEmbed from "../../apis/loadingembed";

export default class DogCommand extends Command {
  constructor(client) {
    super(client, {
      name: "dog",
      group: "fun",
      memberName: "dog",
      description: "Gets a random dog from reddit.",
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    const msg = await message.embed(loadingEmbed());
    const img = await imageapi("dog");
    const embed = new MessageEmbed()
      .setAuthor("r/dog")
      .setImage(img)
      .setFooter(
        "User-Generated Content - From Reddit",
        "https://i.imgur.com/i8yFq9c.png"
      );
    msg.edit(embed);
    const icon = await getAvatar("dog");
    embed.setAuthor("r/dog", icon);
    return msg.edit(embed);
  }
}
