import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import { getAvatar } from "@dada513/subreddit-avatar-image";
import imageapi from "imageapi.js";
import loadingEmbed from "../../apis/loadingembed";

export default class RedditImageCommand extends Command {
  constructor(client) {
    super(client, {
      name: "redditimage",
      group: "fun",
      aliases: ["image", "ri"],
      memberName: "redditimage",
      description: "Gets a random image from a subreddit.",
      args: [
        {
          key: "subreddit",
          type: "string",
          prompt: "What subreddit do you want to get an image from?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { subreddit }) {
    const msg = await message.embed(loadingEmbed());
    let img;
    try {
      img = await imageapi(subreddit);
    } catch (err) {
      return msg.edit(new MessageEmbed().setTitle("No such subreddit"));
    }
    const embed = new MessageEmbed()
      .setAuthor(`r/${subreddit}`)
      .setImage(img)
      .setFooter(
        "User-Generated Content - From Reddit",
        "https://i.imgur.com/i8yFq9c.png"
      );
    msg.edit(embed);
    const icon = await getAvatar(subreddit);
    embed.setAuthor(`r/${subreddit}`, icon);
    return msg.edit(embed);
  }
}
