FROM node:17.6.0
WORKDIR /app
COPY package*.json .
RUN yarn
COPY . .
cmd ["yarn", "start"]
