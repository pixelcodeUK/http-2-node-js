#!/usr/bin/env bash
echo "Upgrading APT"
sudo apt upgrade
sudo apt-get update

echo "Installing nghttp"
sudo apt-get install nghttp2 -y

echo "Installing NVM"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
source ~/.nvm/nvm.sh

echo "Installing Node 5.2.0"
nvm install 5.2.0

echo "Installing package dependencies"
cd /vagrant/
npm install

echo "Installing HTTPS certificates"
cd ~/

openssl genrsa -out key.pem
sudo openssl req -new -key key.pem -nodes -passin file:/vagrant/password -subj "/CN=localhost" -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
