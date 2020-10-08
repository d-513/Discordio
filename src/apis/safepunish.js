import { CommandoMessage } from "discord.js-commando";
import { GuildMember } from "discord.js";

/**
 *
 * @param {GuildMember} member
 * @param {CommandoMessage} message
 * @param {string} reason
 */
export const safeBan = (message, member, reason) => {
  if (!member.bannable) {
    return message.say("I don't have permission to ban this member.");
  }
  return member.ban(`dio: ${reason}`);
};

/**
 *
 * @param {CommandoMessage} message
 * @param {GuildMember} member
 * @param {string} reason
 */
export const safeKick = (message, member, reason) => {
  if (!member.kickable) {
    return message.say("I don't have permission to kick this member.");
  }
  return member.kick(`dio: ${reason}`);
};
