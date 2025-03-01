FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm install -g typescript

RUN npx tsc -p tsconfig.build.json

RUN npm run build

EXPOSE ${PORT}
EXPOSE ${DB_PORT}

CMD ["npm", "start"]