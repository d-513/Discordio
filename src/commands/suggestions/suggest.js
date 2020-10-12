import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import loadingEmbed from "../../apis/loadingembed";
import * as util from "./util";
import knex from "../../database";

export default class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      group: "suggestions",
      memberName: "suggest",
      description: "Posts a suggestion to the suggestion channel.",
      args: [
        {
          key: "msg",
          type: "string",
          prompt: "What suggestion would you like to add?",
        },
      ],
      guildOnly: true,
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message, { msg }) {
    const channel = await util.getChannel(message.guild.id);
    if (!channel) {
      return message.say(
        "This guild does not have a suggestion channel set up."
      );
    }

    const ch = message.guild.channels.cache.get(channel.channelid);
    if (!ch) {
      return message.say(`The suggestion channel for this guild seems to be deleted.
      Create it with \`${this.client.commandPrefix}setupSuggestions\``);
    }

    const m = await ch.send(loadingEmbed());
    await knex("suggestions").insert({
      guild: message.guild.id,
      messageid: m.id,
      content: msg,
      author_tag: message.author.tag,
      author_avatar: message.author.avatarURL(),
    });
    const [id] = await knex("suggestions")
      .where({ guild: message.guild.id, messageid: m.id })
      .select();
    const embed = new MessageEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL())
      .setTitle(`Suggestion #${id.id}`)
      .setDescription(msg)
      .setColor("YELLOW");
    message.say("Done");
    return m.edit("", embed);
  }
}
