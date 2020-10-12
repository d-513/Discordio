import { Command, CommandoMessage } from "discord.js-commando";
import { safeBan, safeKick } from "../../apis/safepunish";
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
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  // TODO Advanced permission system (using webui) - set 'moderator' roles that can warn
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
    message.say(
      `<@${member.user.id}> has been warned.\nThis user has ${warncount.length} warnings.`
    );
    const [action] = await knex("warnActions")
      .where({ guild: message.guild.id, count: warncount.length })
      .select();
    if (action) {
      const rsn = `[WarnActions] User has ${action.count} warnings, executing action ${action.action}`;
      message.say(rsn);
      if (action.action === "kick") {
        safeKick(message, member, rsn);
      } else if (action.action === "ban") {
        safeBan(message, member, rsn);
      }
    }
  }
}
