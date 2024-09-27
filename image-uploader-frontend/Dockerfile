FROM node:14 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --prod

FROM nginx:alpine
COPY --from=build /app/dist/image-uploader-frontend /usr/share/nginx/html
EXPOSE 80
