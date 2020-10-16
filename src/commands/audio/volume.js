import { Command, CommandoMessage } from "discord.js-commando";
import { lavaClient } from "../../index";

export default class VolumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      group: "audio",
      memberName: "volume",
      description: "Sets the music player volume.",
      args: [
        {
          key: "volume",
          type: "integer",
          prompt: "What volume do you want to set?",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { volume }) {
    if (!message.member.voice.channel) {
      return message.say("You are not in a voice channel.");
    }
    const player = await lavaClient.spawnPlayer({
      guild: message.guild,
      voiceChannel: message.member.voice.channel,
      textChannel: message.channel,
      deafen: true,
    });

    await player.setVolume(volume);
    return message.say(`Set the volume to ${volume}`);
  }
}
