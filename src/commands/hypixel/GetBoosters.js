import { Command, CommandoMessage } from "discord.js-commando";
import { MessageEmbed } from "discord.js";
import { uuidToNameHistory } from "../../apis/mojang";
import dayjs from "dayjs";
import * as config from "../../../configuration";
import hypixel from "hypixel-api-wrapper";
import gameids from "./indexes/gameids/gameids";
hypixel.setKey(config.hypixelToken);

export default class GetHypixelBoostersCommand extends Command {
  constructor(client) {
    super(client, {
      name: "hgetboosters",
      group: "hypixel",
      aliases: ["hgb", "hboosters"],
      memberName: "hgetboosters",
      description: "Gets the list of active boosters.",
      args: [
        {
          key: "confirm",
          type: "string",
          oneOf: ["yes"],
          prompt: "This command can be spammy. Do you want to continute? (yes)",
        },
      ],
    });
  }

  /**
   * @param {CommandoMessage} message
   */
  async run(message) {
    if (!config.hypixelToken) {
      return message.say(`The bot owner did not provide a hypixel api key.`);
    }
    const boosters = await hypixel.boosters();
    const embed = new MessageEmbed()
      .setTitle("Active boosters")
      .setColor("RED")
      .setDescription("see above");
    let boosterBody = "";
    const boosterInfo = async (booster) => {
      const purchasedBy = await uuidToNameHistory(booster.purchaserUuid);
      boosterBody += [
        `**Purchased by:** ${purchasedBy[purchasedBy.length - 1].name}`,
        `**Activated at** ${dayjs(booster.dateActivated).format(
          `DD/MM/YYYY ss/mm/hh`
        )}`,
        `**Boost amount**: ${booster.amount}`,
        `**Game**: ${
          gameids.find((game) => game.id == booster.gameType).cleanName
        }`,
        `\n`,
      ].join("\n");
    };
    const promises = [];
    boosters.boosters.forEach((booster, index) => {
      promises.push(boosterInfo(booster));
    });
    await Promise.all(promises);
    await message.say(boosterBody, { split: true });
    return message.say(embed);
  }
}
