import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import { usernameToUUID, uuidToNameHistory } from "../../apis/mojang";
import * as config from "../../../configuration";
import hypixel from "hypixel-api-wrapper";
import loadingEmbed from "../../apis/loadingembed";
hypixel.setKey(config.hypixelToken);

export default class GetHypixelFriendsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hgetfriends",
      group: "hypixel",
      aliases: ["hgf", "hfriends"],
      memberName: "hgetfriends",
      description: "Gets the friend list of a hypixel user.",
      args: [
        {
          key: "username",
          type: "string",
          prompt: "Which user do you want to get friends for?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { username }) {
    if (!config.hypixelToken) {
      return message.say(`The bot owner did not provide a hypixel api key.`);
    }
    const msg = await message.embed(loadingEmbed());
    const uuid = await usernameToUUID(username);
    const friends = await hypixel.friends(uuid);
    let friendBase = "```\n";
    const friendData = async (friend) => {
      const ros = friend.uuidSender === uuid;
      if (ros) {
        const history = await uuidToNameHistory(friend.uuidReceiver);
        const { name } = history[history.length - 1];
        friendBase += `- ${name}\n`;
      } else {
        const history = await uuidToNameHistory(friend.uuidSender);
        const { name } = history[history.length - 1];
        friendBase += `- ${name}\n`;
      }
    };
    const promises = [];
    friends.records.forEach((friend) => promises.push(friendData(friend)));
    await Promise.all(promises);
    friendBase += "```";
    const embed = new MessageEmbed()
      .setAuthor(username, `https://minotar.net/cube/${uuid}/200.png`)
      .setTitle(`${username}'s hypixel friend list`)
      .setDescription(`${friends.records.length !== 0 ? "See below" : "None"}`);
    msg.edit(embed);
    message.say(friendBase, { split: true });
  }
}
