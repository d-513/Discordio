![Discordio](https://i.imgur.com/uEkhyrp.png)

# IMPORTANT ANNOUCEMENT:
Discordio is being recoded to use slash commands using the [botcommander](https://github.com/dada513/botcommander) framework.  
Right now do not use the bot, as the discord.js-commando version hasnt been updated in a while and modules are deprecated

# Discordio

[![Build Status](https://github.com/dada513/Discordio/workflows/ESLint/badge.svg)](https://github.com/dada513/Discordio/actions?query=workflow%3A%22ESLint%22)
[![Discord](https://img.shields.io/badge/chat-on%20discord-brightgreen.svg)](https://discord.gg/p7Fr7mc)
[![Prettier Code Style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Discordio is a fully-featured, open-source (GPL) and selfhostable discord bot.
Made with discord.js and Commando.

Most of the ideas come from the [Carl-Bot](https://carl.gg), [MEE6](https://mee6.xyz) and [Dyno](https://dyno.gg).  
After they got popular, their source code was closed and they became proprietary software locking some features to paid only.  
Discordio aims to fix this gap in the discord bot community - it's a full alternative to most multipurpose bots.  
While easily self-hostable, it will also have a public instance for anyone to use.

**Website**: https://discordio.netlify.app

### Featrures

- Self-hostable
- Suggestions
- Moderation commands
- Warning system
- Customisable warning actions (example: If user has x warnings then ban him)
- Automatic mute system
- COVID-19 statistics
- Info about minecraft servers/users
- Hypixel stats (minecraft)
- Music player
- Search - Full google, duckduckgo and wikipedia search implementation inside of discord.  
  **AND MORE**: This bot is in development and i'm adding new features every day.  
  **POST** any ideas or issues in the issues tab or on our discord

### Running

The recommended way to run Discordio is via [Docker](https://docker.com)
Our docker image is located at [DockerHub](https://hub.docker.com/r/dada513/discordio)

```bash
docker run -v ./discordio:/dio dada513/discordio
```

You can also run it in standalone mode:

```bash
yarn global add @dada513/discordio # or npm i -g @dada513/discordio
discordio # Runs the bot, you need a process manager like pm2 to keep it alive when you close the terminal
```

### Configuration

See [CONFIG.md](./config.md)

### Versioning

Every commit is a `minor` release.  
A `major` release is pushed when the bot gets _compatibility breaking_ updates.  
The source is automatically pushed to NPM.  
Versions are automatically bumped by a github action.

### TODO

- [x] Moderation commands
- [x] Minecraft commands
- [ ] Hypixel commands
- [x] Reddit images
- [x] CoronaVirus stats
- [x] Basic music commands
- [x] Search commands (DuckDuckGo, Google and wikipedia)
- [x] Moderation commands
- [x] Warning actions
- [x] Suggestions
- [ ] Hosted versions of the bot
- [ ] WebUI
- [x] Database
- [ ] Twitch stream notify
- [ ] Youtube upload notify
- [ ] Install guide

### License

Discordio is licensed under the [GPL-v3](LICENSE.md)
