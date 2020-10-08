import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class MuteCommand extends Command {
  constructor(client) {
    super(client, {
      name: "mute",
      group: "mod",
      memberName: "mutes",
      description: "Mutes a member.",
      args: [
        {
          key: "member",
          type: "member",
          prompt: "Which member do you want to mute?",
        },

        {
          key: "reason",
          type: "string",
          prompt: "What is the reason for the mute?",
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
        `This server does not have a mute role set up. Create one with \`${this.client.commandPrefix}muterole\``
      );
    }
    try {
      await member.roles.add(
        role.roleid,
        `dio: ${message.author.tag} muted ${member.user.tag} for ${reason}`
      );
      return message.say(`Muted <@${member.id}>`);
    } catch (ignore) {
      return message.say(
        "I don't have permission to add the mute role to this member."
      );
    }
  }
}
