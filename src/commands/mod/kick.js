import { Command, CommandoMessage } from "discord.js-commando";

export default class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: "kick",
      group: "mod",
      memberName: "kick",
      description: "Kicks a member from the server.",
      guildOnly: true,
      args: [
        {
          key: "member",
          type: "member",
          prompt: "Which member do you want to kick?",
        },

        {
          key: "reason",
          type: "string",
          prompt: "What is the reason for the kick?",
          default: "No reason provided",
        },
      ],
      userPermissions: ["KICK_MEMBERS"],
    });
  }
  /**
   * @param {CommandoMessage} message
   */
  async run(message, { member, reason }) {
    if (message.member.id === member.id) {
      return message.say("can't kick yourself lmao");
    }
    if (
      !message.member.roles.highest.position > member.roles.highest.position &&
      message.member.id !== message.guild.owner.id
    ) {
      return message.say("Error: No permission.");
    }
    if (!member.kickable) {
      return message.say("I don't have permission to kick this member.");
    }
    await member
      .send(
        `You have been kicked from \`${message.guild.name}\` for \`${reason}\``
      )
      .catch(() => {});
    member.kick(`dio: Kicked by ${message.member.id} for ${reason}`);
    return message.say(`Kicked ${member.user.tag}`);
  }
}
