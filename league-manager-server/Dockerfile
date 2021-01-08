FROM node:current-alpine

WORKDIR /app

COPY ./package*.json /app/

RUN npm install

COPY . .

EXPOSE 4000

CMD ["node", "server.js"]
