FROM node:alpine
RUN mkdir /myportofolio
WORKDIR /myportofolio
COPY ./myportofolio/package-lock.json /myportofolio/package-lock.json
COPY ./myportofolio/package.json /myportofolio/package.json
RUN npm install
COPY ./myportofolio/public/ /myportofolio/public
COPY ./myportofolio/src/ /myportofolio/src
CMD [ "npm","start" ]