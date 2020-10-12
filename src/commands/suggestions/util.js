import knex from "../../database";

export const getChannel = async (guildid) => {
  const [channel] = await knex("suggestionChannels")
    .where({ guild: guildid })
    .select();
  return channel;
};
