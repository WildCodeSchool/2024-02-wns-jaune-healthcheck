FROM node:20.10.0-alpine
WORKDIR /app

COPY . .
RUN npm install

COPY src src

CMD npm run build