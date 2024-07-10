FROM node:lts-alpine
WORKDIR /app

RUN apk --no-cache add curl

COPY *.json .
RUN npm install

COPY jest.config.ts .
COPY src src

CMD npm run dev