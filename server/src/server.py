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
        image1 = req_body['image1']
        image2 = req_body['image2']
        searchSize = req_body['searchSize']
        winSize = req_body['winSize']
        overlap = req_body['overlap']
        dt = req_body['dt']

        if searchSize:
            searchSize = int(searchSize)
        if winSize:
            winSize = int(winSize)
        if overlap:
            overlap = int(overlap)
        if dt:
            dt = float(dt)
            
        text_data, image_data = openpiv_handler.two_images(image1, image2, searchSize, winSize, overlap, dt)
        message = json.dumps({ "text_data": text_data, "image_data": image_data })
        return Response(message, status=200, mimetype='application/json')
    
api.add_resource(Openpiv, "/api/openpiv")

app.run(port=443, debug=True, host='0.0.0.0')