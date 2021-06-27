@echo off
cd api && call npm install --silent && echo Api dependencies installed successfully || echo Something went wrong during API install
cd ../client && call npm install --silent && echo Client dependencies installed successfully || echo Something went wrong during Client install
cd ..
echo Init script has finished
