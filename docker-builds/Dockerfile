FROM nginx:stable-alpine

# replace nginx config
COPY --chown=nginx:nginx docker-builds/nginx.conf /etc/nginx/nginx.conf

# replace default server
COPY --chown=nginx:nginx docker-builds/default.conf /etc/nginx/conf.d/default.conf

# setup server config
COPY --chown=nginx:nginx docker-builds/district0x.io.conf /etc/nginx/conf.d/district0x.io.conf

# setup error page
ADD --chown=nginx:nginx https://raw.githubusercontent.com/district0x/X0X/master/X0X.html /usr/share/nginx/html/X0X.html

# # get static content
COPY --chown=nginx:nginx . /district0x-landing-page
RUN rm -rf /district0x-landing-page/docker-builds

# test nginx config
RUN nginx -t

EXPOSE 80
