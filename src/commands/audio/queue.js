import { Command, CommandoMessage } from "discord.js-commando";
import { lavaClient } from "../../index";
import dayjs from "dayjs";
import { MessageEmbed } from "discord.js";

export default class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      group: "audio",
      memberName: "queue",
      description: "Lists the music queue.",
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    if (!message.member.voice.channel) {
      return message.say("You are not in a voice channel.");
    }
    const player = await lavaClient.spawnPlayer({
      guild: message.guild,
      voiceChannel: message.member.voice.channel,
      textChannel: message.channel,
      deafen: true,
    });

    const embed = new MessageEmbed()
      .setTitle("Music queue")
      .setDescription(
        [
          `Total number of tracks: ${player.queue.size}`,
          `Total duration: ${dayjs(player.queue.duration).format(
            "m [minutes] ss [seconds]"
          )}`,
        ].join("\n")
      )
      .setColor("PURPLE");
    let songs = "";
    player.queue.forEach((track, key) => {
      const { title, length, uri } = track;
      songs += `${key}. ${title} - ${uri} - ${dayjs(length).format(
        "m [minutes] ss [seconds]"
      )}\n`;
    });
    embed.addField("Songs", songs.trim() || "None");
    return message.embed(embed);
  }
}
