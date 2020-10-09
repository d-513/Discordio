/**
 * Discordio McSrvStat.us API client
 */
import axios from "cachios";

export const serverStatus = async (ip) => {
  const res = await axios.get(`https://api.mcsrvstat.us/2/${ip}`, {
    ttl: 5 * 60,
  });
  return res.data;
};
