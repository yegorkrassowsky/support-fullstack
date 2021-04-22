# Stage 1 - the build process
FROM node:latest as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

# Stage 2 - the production environment
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build-deps /usr/src/app/build ./
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]