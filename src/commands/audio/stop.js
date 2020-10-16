import { Command, CommandoMessage } from "discord.js-commando";
import { lavaClient } from "../../index";

export default class StopCommand extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      group: "audio",
      memberName: "stop",
      description: "Stops the music player.",
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

    await player.destroy();
    return message.say(`Stopped`);
  }
}
