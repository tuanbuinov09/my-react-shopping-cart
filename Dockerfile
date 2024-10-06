FROM node:20.17

WORKDIR /app/

COPY package.json package-lock.json ./

RUN npm install

COPY . /app/

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]