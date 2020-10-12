# Discordio

Discordio is a fully-featured, open-source (GPL) and selfhostable discord bot.
Made with discord.js and Commando.

Most of the ideas come from the [Carl-Bot](https://carl.gg), [MEE6](https://mee6.xyz) and [Dyno](https://dyno.gg).  
After they got popular, their source code was closed and they became proprietary software locking some features to paid only.  
Discordio aims to fix this gap in the discord bot community - it's a full alternative to most multipurpose bots.  
While easily self-hostable, it will also have a public instance for anyone to use.

https://discordio.netlify.app

### Running

The recommended way to run Discordio is via [Docker](https://docker.com)

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

# License

[GPL-v3](LICENSE.md)
