import { decode } from "js-base64";
import axios from "cachios";

export const usernameToUUID = async (username) => {
  const {
    data,
  } = await axios.get(
    `https://api.mojang.com/users/profiles/minecraft/${username}`,
    { ttl: 15 * 60 }
  );
  return data.id;
};

export const uuidToNameHistory = async (uuid) => {
  const { data } = await axios.get(
    `https://api.mojang.com/user/profiles/${uuid}/names`,
    {
      ttl: 15 * 60,
    }
  );
  return data;
};

export const uuidToSkin = async (uuid) => {
  const res = await axios.get(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
    { ttl: 15 * 60 }
  );
  const data = JSON.parse(decode(res.data.properties[0].value));
  return data;
};

export const uuidToNameMcFriends = async (uuid) => {
  const res = await axios.get(
    `https://api.namemc.com/profile/${uuid}/friends`,
    { ttl: 15 * 60 }
  );
  return res.data;
};

export const nickToOptifineCape = (name) =>
  new Promise((resolve) => {
    const url = `https://opti.dada513.eu/capes/${name}.png`;
    axios
      .get(url, { ttl: 15 * 60 })
      .then(() => resolve(url))
      .catch(() => resolve(false));
  });
