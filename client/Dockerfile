FROM node:10.15.3-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . /app
EXPOSE 8080
CMD [ "npm", "run", "serve" ]


# react
## base image
#FROM node:10.15.3
#
## set working directory
#RUN mkdir /usr/src/frontend
#WORKDIR /usr/src/frontend
#
## add `/usr/src/app/frontend/.bin` to $PATH
##ENV PATH /usr/src/frontend/node_modules/.bin:$PATH
#
## install and cache app dependencies
#COPY package.json /usr/src/frontend/package.json
#RUN npm install --silent
#RUN npm install react-scripts@1.1.1 -g --silent
## start app
#CMD ["npm", "start"]