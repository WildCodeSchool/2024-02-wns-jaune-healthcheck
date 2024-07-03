FROM node:lts-alpine
WORKDIR /app

COPY *.json .
RUN npm install

COPY src src

CMD npm run dev