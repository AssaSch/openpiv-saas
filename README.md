# openpiv-saas

## Background:
This application consist of two parts:
1. javascript client.
2. python server.

## Basic flow:
The user sends process command using the web page. This command gets from the javascript client to the server.
The python server to performs the neccessery action and gets back the result, pass it back to the client and shows it on screen.

For this version the flow supported is basic analysis of two images.

## Installation:
1. clone openpiv-saas repository.
2. install docker and docker-compose on your server.
3. in openpiv-saas root directory run command: docker-compose up -d
4. make sure the server can get incomming trafic from port 80. 
