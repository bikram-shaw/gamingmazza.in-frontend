FROM node:12.19.0-alpine as builder
WORKDIR /DayWriter-Angular
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:1.17.1-alpine
COPY --from=builder /dist/DayWriter-Angular/ /usr/share/nginx/html
