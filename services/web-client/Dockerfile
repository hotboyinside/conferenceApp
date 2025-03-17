FROM node:18-alpine

WORKDIR /app

COPY /web-client/package.json .
COPY /web-client/package-lock.json .

ARG VITE_API_URL
ARG VITE_SOCKET_API_URL
ARG VITE_API_WS_URL

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_API_URL=$VITE_SOCKET_API_URL
ENV VITE_API_WS_URL=$VITE_API_WS_URL

RUN npm install

RUN npm i -g serve

COPY /web-client/ .

RUN npm run build

EXPOSE 3001

CMD [ "serve", "-s", "dist" ]