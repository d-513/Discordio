import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import { serverStatus } from "../../apis/mcsrv";
import * as config from "../../../configuration";
import knex from "../../database";
import loadingEmbed from "../../apis/loadingembed";
import imgur from "imgur";

imgur.setClientId(config.imgurToken);

export default class MinecraftServerCommand extends Command {
  constructor(client) {
    super(client, {
      name: "minecraftserver",
      group: "minecraft",
      aliases: ["mcsrv"],
      memberName: "minecraftserver",
      description: "Gets the status of a minecraft server.",
      args: [
        {
          key: "ip",
          type: "string",
          prompt: "What is the server's address?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { ip }) {
    if (!config.imgurToken) {
      return message.say(
        "The bot owner did not set an imgur API key, the minecraft command won't work."
      );
    }
    const msg = await message.embed(loadingEmbed());
    const status = await serverStatus(ip);
    const embed = new MessageEmbed()
      .setTitle(ip)
      .setAuthor(message.author.tag, message.author.avatarURL());
    if (!status.online) {
      embed
        .setColor("RED")
        .addField(
          "Online",
          "The server did not accept our requests, it might be offline."
        );
    } else {
      embed
        .setColor("GREEN")
        .addField("Online", true, true)
        .addField("MOTD", status.motd.clean, true)
        .addField(
          "Players",
          `Online: ${status.players.online}
          Max: ${status.players.max}`,
          true
        )
        .addField("Version", status.version, true)
        .setThumbnail("https://i.imgur.com/DtGds9Y.png");
    }
    const [cachedIcon] = await knex("mcServIcons").where({ ip }).select();
    if (cachedIcon) {
      embed.setThumbnail(cachedIcon.url);
    }
    await msg.edit(embed);
    if (!cachedIcon) {
      if (!status.icon) return;
      const img = await imgur.uploadBase64(status.icon.split(",")[1]);
      embed.setThumbnail(img.data.link);
      await knex("mcServIcons").insert({
        ip,
        url: img.data.link,
      });
      return msg.edit(embed);
    }
  }
}
