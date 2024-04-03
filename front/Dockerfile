FROM node:21.5 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn build


FROM node:21.5 AS production

RUN yarn global add serve

COPY --from=build /app/build /app

WORKDIR /app

EXPOSE 5000

CMD ["serve", "-s", "."]
