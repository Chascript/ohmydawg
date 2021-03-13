#!/bin/bash

sudo apt-get update
wait
#docker
sudo apt install apt-transport-https ca-certificates curl software-properties-common
wait
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
wait
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic stable"
wait
sudo apt update
wait
apt-cache policy docker-ce
wait
sudo apt install docker-ce
wait
#docker-compose
curl -L https://github.com/docker/compose/releases/download/1.20.0/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose
wait
chmod +x /usr/local/bin/docker-compose
wait
sudo chmod +x /usr/local/bin/docker-compose
wait
#clone
git clone https://www.github.com/chascript/ohmydawg
wait
cd ohmydawg/
wait
sudo docker-compose -f docker-compose-test.yml up --build