FROM node:12-alpine

RUN apk add git
WORKDIR /dio
RUN git clone https://github.com/dada513/Discordio .
RUN yarn install --production=true
RUN yarn add pg

CMD ["node", "launcher.js"]