import { Command, CommandoMessage } from "discord.js-commando";
import knex from "../../database";

export default class RemoveMuteRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: "removemuterole",
      group: "config",
      memberName: "something",
      aliases: ["deletemuterole"],
      description: "Removes the current muterole from the database and server.",
      guildOnly: true,
      clientPermissions: ["MANAGE_ROLES"],
      userPermissions: ["ADMINISTRATOR"],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    const [role] = await knex("muteRoles")
      .where({ guild: message.guild.id })
      .select();
    if (!role) {
      return message.say("This server doesn't have a mute role setup.");
    }
    try {
      await message.guild.roles.cache
        .get(role.roleid)
        .delete(`dio: removemuterole executed by ${message.author.tag}`);
      await message.say("Muterole deleted from the server.");
    } catch (ignore) {
      await message.say(
        "Role deletion failed, it was removed from the database, but the bot didn't have permission to delete it from the server. you will need to delete it  manually."
      );
    }

    await knex("muteRoles").where({ guild: message.guild.id }).delete();
    return message.say("Muterole deleted from the database.");
  }
}
