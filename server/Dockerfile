FROM ubuntu:16.04 

RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository ppa:jonathonf/python-3.6
RUN apt-get update
RUN apt-get install -y cython python-numpy python-scipy
RUN apt-get install -y  python3.6
RUN apt-get -y install python3-pip
RUN apt-get -y install build-essential libssl-dev libffi-dev python3-dev
RUN pip3 install --upgrade pip
RUN pip3 install numpy
RUN pip3 install openpiv
RUN pip3 install flask
RUN pip3 install flask_restful
RUN pip3 install flask_cors
RUN pip3 install uwsgi

COPY . /app

WORKDIR /app

CMD ["python3", "src/server.py"]
