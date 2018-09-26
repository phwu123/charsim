FROM node:alpine
RUN mkdir /sim
WORKDIR /sim
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3600
CMD ["npm", "start"]