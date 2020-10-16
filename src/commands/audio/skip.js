import { Command, CommandoMessage } from "discord.js-commando";
import { lavaClient } from "../../index";

export default class SkipCommand extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      group: "audio",
      memberName: "skips",
      description: "Skips a song in the queue.",
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

    await player.play();
    return message.say("Skipped!");
  }
}
