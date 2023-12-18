FROM node:alpine

WORKDIR /app
COPY ./package.json ./package.json
COPY . .
RUN npm install
EXPOSE 5173

CMD ["npm", "run", "dev"]