// Bot's token
export const token = "";

// Additional bot configuration
export const bot = {
  commandPrefix: "?",
  owner: "",
  invite: "https://discord.gg/server",
  status: "discordio-0.0.1-dev",
};

export const db = {
  client: "sqlite3",
  connection: {
    filename: "./data/discordio.db",
  },
};

export const web = {
  port: 3000,
};

// Integrated lavalink server
// This is recommended. This is an easy way to use the sound module.
// Otherwise you would need to set up a custom Lavalink server below and use it.
export const iLavaLink = {
  enabled: false,
  address: "0.0.0.0",
  port: 2333,
  password: Math.random().toString(),
};

// Don't modify unless using custom lavalink instance(s)
export const lavaLinkNodes = [
  {
    host: iLavaLink.address,
    port: iLavaLink.port,
    password: iLavaLink.password,
    retries: 5,
  },
];

// Advanced options for the integrated lavalink instance
// Don't touch unless needed. Configure most lavalink settings above.
export const advancedLavaLinkOptions = {
  server: {
    port: iLavaLink.port,
    address: iLavaLink.address,
  },
  lavalink: {
    server: {
      password: iLavaLink.password,
      sources: {
        youtube: true,
        bandcamp: true,
        soundcloud: true,
        twitch: true,
        vimeo: true,
        mixer: true,
        http: true,
        local: false,
      },
      bufferDurationMs: 400,
      youtubePlaylistLoadLimit: 6,
      youtubeSearchEnabled: true,
      soundcloudSearchEnabled: true,
      "gc-warnings": true,
    },
  },
  metrics: {
    prometheus: {
      enabled: false,
      endpoint: "/metrics",
    },
  },
  sentry: {
    dsn: "",
  },
  logging: {
    file: {
      "max-history": 30,
      "max-size": "16MB",
    },
    path: "./logs/",
    level: {
      root: "INFO",
      lavalink: "INFO",
    },
  },
};
