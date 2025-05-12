FROM node:20 AS build

WORKDIR /app 

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run swagger

FROM gcr.io/distroless/nodejs20

WORKDIR /app

COPY --from=build /app /app 

EXPOSE 3000

CMD ["index.js"]