FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install sequelize-cli

COPY . .

RUN npx sequelize-cli db:migrate

EXPOSE 8080
CMD [ "node", "server.js" ]
