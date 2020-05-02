FROM node:10
WORKDIR /home/beng/aplikacija
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE  4000
CMD [ "node", "server.js" ]
