import { Command, CommandoMessage } from "discord.js-commando";
import { lavaClient } from "../../index";

export default class ResumeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      group: "audio",
      memberName: "resume",
      description: "Resumes the song queue.",
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

    if (player.paused) await player.resume();
    return message.say("Resumed");
  }
}
