import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import loadingEmbed from "../../apis/loadingembed";
import * as mojang from "../../apis/mojang";

export default class MojangProfileCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mojangprofile",
      group: "minecraft",
      memberName: "mojangprofile",
      aliases: ["mp"],
      description: "Shows information about a minecraft profile.",
      args: [
        {
          key: "name",
          type: "string",
          prompt: "What is the name of the minecraft profile?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { name }) {
    const msg = await message.embed(loadingEmbed());
    const uuid = await mojang.usernameToUUID(name);
    if (!uuid) {
      msg.delete();
      return message.say(`No such user named ${name}`);
    }

    // name history magic
    let history = await mojang.uuidToNameHistory(uuid);
    history = history.reverse();
    let textHistory = "";
    history.forEach(({ name }) => {
      textHistory += `- **${name}**\n`;
    });

    const skin = await mojang.uuidToSkin(uuid);
    const opticape = await mojang.nickToOptifineCape(name);
    const namemcfriends = await mojang.uuidToNameMcFriends(uuid);
    let friendList = "";
    namemcfriends.forEach((friend) => (friendList += `${friend.name}\n`));
    if (friendList.length > 50) {
      friendList = friendList.substring(0, 50);
      friendList += `\n...and more`;
    }

    const embed = new MessageEmbed()
      .setTitle(name)
      .addField("UUID", uuid, true)
      .addField("Name history", `${textHistory}`, true)
      .addField("Skin download URL", skin.textures.SKIN.url, true)
      .addField(
        "Optifine cape download URL",
        opticape ? opticape : "Account doesn't have optifine cape",
        true
      )
      .addField(
        "Mojang cape download URL",
        skin.textures.CAPE ? skin.textures.CAPE.url : "No mojang cape",
        true
      )
      .addField("NameMC friends", friendList ? friendList : "None", true)
      .setThumbnail(`https://minotar.net/cube/${uuid}/200.png`)
      .setImage(`https://minotar.net/body/${uuid}/100.png`);
    return msg.edit(embed);
  }
}
