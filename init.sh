#!/bin/bash
cd api && npm install --silent && echo "Api dependencies installed successfully" || echo "Something went wrong during API install"
cd ../client && npm install --silent && echo "Client dependencies installed successfully" || echo "Something went wrong during Client install"
echo "Init script has finished"
