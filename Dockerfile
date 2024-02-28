FROM node:16.7.0-alpine as build

ARG VITE_NETWORK

WORKDIR /app

COPY package.json package-lock.json .
RUN npm install
COPY . .
RUN npm run build

# Path: Dockerfile
FROM nginx:1.21.1-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
