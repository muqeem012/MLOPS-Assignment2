# Node portion of image
FROM node:19.8.1-alpine as react_code

WORKDIR /application

COPY . .

RUN npm install

RUN npm run build

# Nginx portion of image

FROM nginx:1.23-alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=react_code /application/build .

# since there are two images in container so to specify the entry point
ENTRYPOINT  ["nginx", "-g", "daemon off;"]
