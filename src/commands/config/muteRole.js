import { Command, CommandoMessage } from "discord.js-commando";
import forEach from "p-each-series";
import knex from "../../database";

export default class MuteRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: "muterole",
      group: "config",
      memberName: "muterole",
      description: "Configures the role muted members get.",
      args: [
        {
          key: "name",
          type: "string",
          default: "Muted",
          prompt: "What name should the role have?",
        },
      ],
      guildOnly: true,
      clientPermissions: ["MANAGE_CHANNELS", "MANAGE_ROLES"],
      userPermissions: ["ADMINISTRATOR"],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { name }) {
    const muteroles = await knex("muteRoles")
      .where({ guild: message.guild.id })
      .select();
    if (muteroles.length !== 0) {
      return message.say(
        `There is already a mute role set up for this server, remove it with \`${this.client.commandPrefix}removemuterole\`\n\n**TIP**: Even if you deleted it manually, remove it using the command to clear it from the database.`
      );
    }
    message.say("Starting muterole creation...");
    const role = await message.guild.roles.create({
      data: {
        name,
        color: "GRAY",
      },
      reason: "dio: Muterole setup",
    });
    const iterator = async (channel) => {
      channel = channel[1];
      await channel.updateOverwrite(role.id, {
        SEND_MESSAGES: false,
      });
    };
    await forEach(message.guild.channels.cache, iterator);
    await knex("muteRoles").insert({
      guild: message.guild.id,
      roleid: role.id,
    });
    message.say(
      `Created muterole named <@&${role.id}> and set overwrites for ${message.guild.channels.cache.size} channels.`
    );
  }
}
