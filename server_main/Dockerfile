FROM node:20-alpine

WORKDIR /server_main

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]