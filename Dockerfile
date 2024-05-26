FROM        node:18.2-alpine as builder
RUN         npm install -g npm@8.13.1
ARG         APP_PATH=/root/app
COPY        . /root/app
WORKDIR     $APP_PATH
RUN         npm install && npm run build

FROM        nginx:alpine
ARG         APP_PATH=/root/app
COPY        --from=builder  $APP_PATH/dist /usr/share/nginx/html
COPY        nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE      80