import { Command, CommandoMessage } from "discord.js-commando";

export default class SuggestCommand extends Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      group: "suggestions",
      memberName: "suggest",
      description: "Posts a suggestion to the suggestion channel.",
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  run(message) {
    return message.say("something");
  }
}
