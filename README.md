# openpiv-saas

Basic SaaS version of OpenPIV package.

## Basic flow:
For this version the flow supported is basic analysis of two images:
1. The user uploads two images and sends it to the server.
2. The server performs the neccessery action and sends back the result file to the user.

## Installation:
* prerequisites: operating system that can run docker containers.
1. clone openpiv-saas repository to your server.
2. in .env file in the root of client directory, change the REACT_APP_SERVER_URL value to your server url.
3. make sure the server alows incomming trafic from ports 80 (for client) and 443 (for server).
4. install docker and docker-compose on your server:
  - example of install docker on ubuntu 16.04 https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04
  -  example of install docker-compose on ubuntu 16.04 https://www.digitalocean.com/community/tutorials/how-to-install-docker-compose-on-ubuntu-16-04
5. in openpiv-saas root directory run command: docker-compose up -d (the installation process can take few minutes).

