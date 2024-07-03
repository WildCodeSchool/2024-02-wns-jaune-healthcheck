FROM node:lts-alpine
WORKDIR /app

COPY *.json .
COPY *.cjs .
COPY *.ts .
COPY *.html .
RUN npm install

COPY src src

CMD npm run dev