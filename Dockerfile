FROM localhost:5000/nginx-mahya


ENV TOKEN_EXPIRES_IN 24h

#WORKDIR /usr/src/app
#RUN mkdir /opt/html
COPY ./build/nginx.conf /etc/nginx/nginx.conf
COPY ./build /usr/share/nginx/html
#RUN setsebool -P httpd_can_network_connect 1

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]
