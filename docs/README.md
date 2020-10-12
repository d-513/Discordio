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

- Suggestions
- Moderation commands
- Warning system
- Customisable warning actions (example: If user has x warnings then ban him)
- Automatic mute system
- COVID-19 statistics
- Info about minecraft servers/users
- Stats of the Hypixel minecraft server
  **AND MORE**: This bot is in development and i'm adding new features every day.

### Running

The recommended way to run Discordio is via [Docker](https://docker.com)
Our docker image is located at [DockerHub](https://hub.docker.com/r/dada513/discordio)

```bash
docker run \
  -e DIO_TOKEN=your_bot_token \
  -e DIO_PREFIX=! \
  -e DIO_OWNER=ownerid \
  -e DIO_STATUS=Running \
  -e DIO_INVITE=https://discord.gg/p7Fr7mc \
  -e DIO_IMGUR_KEY=imgkey \
  -e DIO_HYPIXEL_KEY=hypkey \
  dada513/discordio
```

**TIP:** When using docker on windows in PowerShell, replace `\` with `\``.

You can also run it in standalone mode:

```bash
yarn global add @dada513/discordio # or npm i -g @dada513/discordio
discordio # Runs the bot, specify the config in .env in the current directory
```

### Versioning

Every commit is a `minor` release.  
A `major` release is pushed when the bot gets _compatibility breaking_ updates.  
The source is automatically pushed to NPM.  
Versions are automatically bumped by a github action.

### License

Discordio is licensed under the [GPL-v3](LICENSE.md)
