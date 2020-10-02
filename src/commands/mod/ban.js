import { Command, CommandoMessage } from "discord.js-commando";

module.exports = class BanCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ban",
      group: "mod",
      memberName: "ban",
      description: "Bans a member from the server.",
      guildOnly: true,
      args: [
        {
          key: "member",
          type: "member",
          prompt: "Which member do you want to ban?",
        },

        {
          key: "reason",
          type: "string",
          prompt: "What is the reason for the ban?",
          default: "No reason provided",
        },
      ],
      userPermissions: ["BAN_MEMBERS"],
    });
  }
  /**
   * @param {CommandoMessage} message
   */
  async run(message, { member, reason }) {
    if (message.member.id === member.id) {
      return message.say("why ban yourself lol");
    }
    if (
      !message.member.roles.highest.position > member.roles.highest.position &&
      message.member.id !== message.guild.owner.id
    ) {
      return message.say(
        "Error: No permission. The user you are trying to has a higher role than yours."
      );
    }
    if (!member.bannable) {
      return message.say("I don't have permission to ban this member.");
    }
    await member
      .send(
        `You have been banned from \`${message.guild.name}\` for \`${reason}\``
      )
      .catch(() => {});

    member.ban({ reason: `dio: banned by ${message.member.id} for ${reason}` });
    return message.say(`Banned ${member.user.tag}`);
  }
};
