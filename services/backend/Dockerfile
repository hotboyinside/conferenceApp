FROM node:18-alpine

WORKDIR /backend

COPY /backend/package.json ./

COPY /backend/package-lock.json ./

RUN npm install

COPY /backend/ .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]