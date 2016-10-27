FROM node
MAINTAINER Tim Torgenrud "torg@stanford.edu"
RUN apt-get update -y
RUN apt-get install nodejs -y
RUN apt-get install npm -y

COPY . /app
WORKDIR /app

RUN npm install express --save
RUN npm install body-parser --save

CMD node initial-api.js
