# PB138 Project - Notion 

## Project requirements - one of 
```
- locally runnable Docker - on Windows you can use WSL2
- local node.js >= 14.15.0 + NPM
```

## Project setup and deploy via docker
You will need to:
1. run `docker-compose up` in the project root
2. that's literally it

## Project setup and deploy via local node.js
You will need to:
1. run `init.bat` or `init.sh` in the project root, depening on the platform of your choice
2. in the `api` folder run `npm start`
3. in the `client` folder run `npm start` 

## How to reach the app
- localhost:3000 is the Client part
- localhost:5000 is the API part