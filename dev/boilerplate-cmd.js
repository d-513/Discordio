import { Command, CommandoMessage } from "discord.js-commando";

export default class SomethingCommand extends Command {
  constructor(client) {
    super(client, {
      name: "something",
      group: "something",
      memberName: "something",
      description: "something",
    });
  }
  /**
   * @param {CommandoMessage} message
   */
  run(message) {
    return message.say("something");
  }
}
