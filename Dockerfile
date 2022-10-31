FROM node:16.16.0
COPY . .
RUN npm ci
RUN npm run build
CMD npm start