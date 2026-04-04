FROM node:lts-alpine as builder
WORKDIR /frontend

ARG VITE_BASE_URL=http://localhost
ENV VITE_BASE_URL=$VITE_BASE_URL

COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm ci
COPY ./frontend .
RUN npm run build

FROM nginx:alpine
COPY ./webserver/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /frontend/dist /usr/share/nginx/html