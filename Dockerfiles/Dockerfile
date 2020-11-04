FROM node:12-alpine

RUN apk add git
WORKDIR /source
RUN git clone https://github.com/dada513/Discordio .
RUN yarn install
RUN yarn add sqlite3
RUN yarn build
RUN mkdir -p /data

CMD ["node", "launcher.js"]