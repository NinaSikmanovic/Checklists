FROM nginx
COPY ./config/production.conf /etc/nginx/conf.d/default.conf
COPY ./index.html /usr/share/nginx/html/index.html
ADD dist /usr/share/nginx/html/dist
