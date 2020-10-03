import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class WarnCommand extends Command {
  constructor(client) {
    super(client, {
      name: "warn",
      group: "mod",
      memberName: "warn",
      description: "Warns a member.",
      args: [
        {
          key: "member",
          type: "member",
          prompt: "Which member do you want to warn?",
        },
        {
          key: "reason",
          type: "string",
          prompt: "What is the reason for the warning?",
        },
      ],
      userPermissions: ["KICK_MEMBERS"],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  // TODO Advanced permission system (using webui) - set 'moderator' roles that can warn
  // TODO Warning actions: if player has x warnings ban him
  async run(message, { member, reason }) {
    if (
      !message.member.roles.highest.position > member.roles.highest.position &&
      message.member.id !== message.guild.owner.id
    ) {
      return message.say("Error: No permission.");
    }

    await knex("warnings").insert({
      guild: message.guild.id,
      user: member.user.id,
      warnedby: message.author.id,
      reason,
    });
    const warncount = await knex("warnings")
      .where({ user: member.user.id })
      .select("*");
    return message.say(
      `<@${member.user.id}> has been warned.\nThis user has ${warncount.length} warnings.`
    );
  }
}
