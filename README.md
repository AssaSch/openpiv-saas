# openpiv-saas
Developed and tested on ubuntu 18.04

## Background:
This application consist of two parts:
1. javascript client + server.
2. python server.

## Basic flow:
The user sends process command using the web page. This command gets from the javascript client to the server.
The javascript server send request to the python server to perform the neccessery action and gets back the result, pass it back to the client and shows it on screen.

For this version the flow supported is basic analysis of two images.

## Installation:
### javascript dependencies:
1. install node.js LTS version from - https://nodejs.org/en/
2. clone openpiv-saas repository.
3. $> cd server && npm install
4. $> cd client && npm install
### run javascript server + client:
1. from server folder run: $> sudo npm run dev

### python dependencies:
1. $> cd openpiv/api-server && python3 -m virtualenv env
2. $> source env/bin/activate
3. $> pip install flask flask_restful numpy scipy matplotlib scikit-image progressbar
## run python server:
from openpiv/api-server run: 
1. $> source env/bin/activate
2. $> python src/server.py
