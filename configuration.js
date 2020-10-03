const env = process.env;
// Bot's token
export const token = env.DIO_TOKEN;

// Additional bot configuration
export const bot = {
  commandPrefix: env.DIO_PREFIX,
  owner: env.DIO_OWNER,
  invite: env.DIO_SERVER,
  status: env.DIO_STATUS,
};

export let db;
if (env.DIO_DB) db = JSON.stringify(env.DIO_DB);
else
  db = {
    client: "sqlite3",
    connection: {
      filename: "./data/discordio.db",
    },
    useNullAsDefault: true,
  };

export const web = {
  port: process.env.DIO_WEB_PORT,
};

export const lavaLinkNodes = [
  {
    host: "127.0.0.1",
    port: 2333,
    password: "LLpassword",
    retries: 5,
  },
];
