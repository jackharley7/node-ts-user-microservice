FROM node:8.9.1-alpine

# Create app directory
WORKDIR /src

ENV NPM_CONFIG_LOGLEVEL warn

# Install app dependencies
# COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json gulpfile.js ./

ADD . /src

RUN npm install
RUN npm run build

# Bundle app source
# COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
