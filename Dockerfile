# Stage 0, "build-stage", based on Node.js, to build and compile the frontend
FROM node AS build-stage

WORKDIR /app

COPY ./ /app/

RUN yarn install

RUN yarn run build

# Stage 1, based on Apache, to have only the compiled app, ready for production with Apache
FROM httpd

COPY --from=build-stage /app/build/ /usr/local/apache2/htdocs/

RUN mkdir -p /etc/apache2/sites-available/

RUN printf "<Directory \"/usr/local/apache2/htdocs/\"> \n FallbackResource /index.html\n </Directory>" >> /etc/apache2/sites-available/000-default.conf
