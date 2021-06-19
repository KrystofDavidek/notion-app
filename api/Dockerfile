FROM node:16.3-alpine3.11

WORKDIR /opt/project

COPY ./package.json /opt/project/
COPY ./package-lock.json /opt/project/

RUN npm install --silent

EXPOSE 3000
CMD ["npm", "start"]
