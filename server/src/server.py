from flask import Flask, jsonify, json, Response, request
from flask_restful import Api, Resource
from flask_cors import CORS
import openpiv_handler


app = Flask(__name__)
CORS(app)
api = Api(app)

class Openpiv(Resource):
    
    def post(self):
        req_body = request.get_json()
        data = openpiv_handler.two_images(req_body['image1'], req_body['image2'])
        return data ,200
    
api.add_resource(Openpiv, "/api/openpiv")

app.run(port=4000, debug=True, host='0.0.0.0')