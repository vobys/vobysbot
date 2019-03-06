FROM arm64v8/node:alpine
LABEL maintainer="Alfredo Foltran <alfoltran@gmail.com>"

# Install pm2
RUN npm install pm2 -g

# Bundle APP files
COPY commands commands/
COPY events events/
COPY modules modules/
COPY scripts scripts/
COPY config.js .
COPY config.json .
COPY ecosystem.config.js .
COPY package.json .
COPY vobys.js .

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install --production \
    && apk del .gyp

# Expose the listening port of your app
EXPOSE 8000

# Show current folder structure in logs
RUN ls -al -R

CMD [ "pm2-runtime", "start", "ecosystem.config.js" ]
