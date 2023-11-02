#!/usr/bin/bash
apt install hiptext
CYAN="\033[1;36m"
PURPLE="\033[1;35m"
GREEN="\033[1;32m"
RED='\033[1;31m'
NC='\033[0m'

clear 

pkg install figlet 

clear

apt install ruby
npm i cheerio
apt-get update
apt-get upgrade
apt-get install nodejs
apt-get install libwebp
apt-get install ffmpeg
apt-get install wget
apt-get install tesseract
apt-get install git -y 
apt-get install nodejs-lts -y 
apt-get install python -y 
npm i -g npm@6

clear 

wget -O ~/../usr/share/tessdata/ind.traineddata "https://github.com/tesseract-ocr/tessdata/blob/master/ind.traineddata?raw=true"
npm i -g cwebp && npm i -g ytdl && npm i  && npm i got
echo  "Digite sh start.sh E Escaneie o Qr Code" | lolcat -a -d 50 
