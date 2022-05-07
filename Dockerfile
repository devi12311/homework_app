FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
COPY . .

RUN npm install sequelize-cli
RUN npx sequelize-cli db:migrate



EXPOSE 8080
CMD [ "node", "server.js" ]
