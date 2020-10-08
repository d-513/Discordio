import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class UnMuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "unmute",
      group: "mod",
      memberName: "unmute",
      description: "Unmutes a member.",
      args: [
        {
          key: "member",
          type: "member",
          prompt: "Which member do you want to unmute?",
        },

        {
          key: "reason",
          type: "string",
          prompt: "What is the reason for the unmute?",
          default: "No reason provided",
        },
      ],
      guildOnly: true,
      userPermissions: ["KICK_MEMBERS"],
      clientPermissions: ["KICK_MEMBERS"],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { member, reason }) {
    const [role] = await knex("muteRoles")
      .where({ guild: message.guild.id })
      .select();
    if (!role) {
      return message.say(
        `This server does not have a mute role set up. Create one with \`${this.client.commandPrefix}unmuterole\``
      );
    }
    if (!member.roles.cache.has(role.roleid)) {
      return message.say(`This member is not muted`);
    }
    try {
      await member.roles.remove(
        role.roleid,
        `dio: ${message.author.tag} unmuted ${member.user.tag} for ${reason}`
      );
      return message.say(`Unmuted <@${member.id}>`);
    } catch (ignore) {
      return message.say(
        "I don't have permission to remove the mute role from this member."
      );
    }
  }
}
