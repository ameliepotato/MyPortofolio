FROM node:alpine
RUN mkdir /myportofolio
WORKDIR /myportofolio
COPY ./myportofolio/package-lock.json /myportofolio/package-lock.json
COPY ./myportofolio/package.json /myportofolio/package.json
COPY . /myportofolio
RUN npm install
# Set up a default command
CMD [ "npm","start" ]