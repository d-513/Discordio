import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import loadingEmbed from "../../apis/loadingembed";
import { lavaClient } from "../../index";

export default class PlayCommand extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      group: "audio",
      memberName: "play",
      description: "Plays a song.",
      args: [
        {
          key: "name",
          type: "string",
          prompt: "What song to play?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { name }) {
    if (!message.member.voice.channel) {
      return message.say("You are not in a voice channel.");
    }
    const msg = await message.embed(loadingEmbed());
    const player = await lavaClient.spawnPlayer({
      guild: message.guild,
      voiceChannel: message.member.voice.channel,
      textChannel: message.channel,
      deafen: true,
    });
    let song;
    const recursor = async (i) => {
      try {
        song = await player.lavaSearch(name, message.member, {
          source: "yt",
          add: false,
        });
      } catch (ignore) {
        if (i > 5) {
          return msg.edit("", "No songs found.");
        } else {
          await recursor(i + 1);
        }
      }
    };

    await recursor(1);

    if (Array.isArray(song)) {
      await player.queue.add(song[0]);
      const embed = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setTitle("Track added to queue")
        .setThumbnail(song[0].thumbnail.max)
        .setDescription(
          `Title: ${song[0].title}
           URL: ${song[0].uri}`
        )
        .setColor("RED");
      msg.edit(embed);
    } else {
      await player.queue.add(res.tracks);
      const embed = new MessageEmbed()
        .setAuthor(song.author)
        .setTitle("Playlist added to queue")
        .setDescription(
          `Title: ${song.title}
           Tracks: ${song.trackCount}`
        )
        .setColor("RED");
      msg.edit(embed);
    }
    if (!player.playing) await player.play();
  }
}
