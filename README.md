# openpiv-web-server
developed and tested on ubunto 18.04

## installation:
### javascript dependencies:
1. install node.js LTS version from - https://nodejs.org/en/
2. clone openpiv-saas repository.
3. $> cd server && npm install
4. $> cd client && npm install
### python dependencies:
1. $> cd openpiv/api-server && python3 -m virtualenv env
2. $> source env/bin/activate
3. $> pip install flask flask_restful numpy scipy matplotlib scikit-image progressbar
## run devlopment environment:
1. from server folder run: $> sudo npm run dev
2. from opempiv/api-server run: $> python src/server.py
