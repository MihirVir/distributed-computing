from flask import Flask, jsonify, request
import pika
import os
import json
import pymongo
from bson import json_util

app = Flask(__name__)

# Set RabbitMQ connection details with environment variables or default values
rabbitmq_host = os.getenv('RABBITMQ_HOST', 'localhost')
rabbitmq_port = int(os.getenv('RABBITMQ_PORT', 5672))
rabbitmq_queue = os.getenv('RABBITMQ_QUEUE', 'flight_info_queue')

# Establish connection to RabbitMQ
connection_parameters = pika.ConnectionParameters(host=rabbitmq_host, port=rabbitmq_port)
connection = pika.BlockingConnection(connection_parameters)
channel = connection.channel()

# Declare the queue
channel.queue_declare(queue=rabbitmq_queue)

# Read MongoDB host and port from environment variables or use default values
mongo_host = os.getenv('MONGO_HOST', 'localhost')
mongo_port = int(os.getenv('MONGO_PORT', '27017'))

# Connect to MongoDB
client = pymongo.MongoClient(f"mongodb://{mongo_host}:{mongo_port}/")
db = client["airline1_db"]
airline1_collection = db["flights"]

# get all flights' info
@app.route('/api/v1/airlin11-service/flights', methods=['GET'])
def get_flights():
    flights = airline1_collection.find({}, {'_id': 0})
    flights_list = list(flights)
    for flight in flights_list:
        send_flight_info_to_queue(str(flight))
    return jsonify(flights_list)

# get specific flight info
@app.route('/api/v1/airlin11-service/flights/<flight_no>', methods=['GET'])
def get_flight(flight_no):
    flight = airline1_collection.find_one({"flight_no": flight_no}, {'_id': 0})
    if flight:
        return jsonify(flight)
    else:
        return "Flight not found", 404

# update price according to the rating of airline
@app.route('/api/v1/airlin11-service/flights/update-prices', methods=['POST'])
def update_flight_prices():
    rating = request.json.get('rating')
    if not rating:
        return jsonify({"error": "Rating not provided"}), 400

    flights = airline1_collection.find()
    updated_flights = []

    for flight in flights:
        # calculate new price
        new_price = int(flight['price'] * (rating / flight['airline']['rating']))
        # update info
        airline1_collection.update_one(
            {"_id": flight['_id']},
            {"$set": {
                "price": new_price,
                "airline.rating": rating
            }}
        )
        # add updated flight in to the list
        flight['price'] = new_price
        flight['airline']['rating'] = rating
        updated_flights.append(flight)

    # send updated flighs info to RabbitMQ
    for updated_flight in updated_flights:
        send_flight_info_to_queue(json.dumps(updated_flight, default=str))
    
    return jsonify({"status": "airline ratings and prices updated"})

# send flight info to RabbitMQ queue
def send_flight_info_to_queue(flight_info):
    global connection, channel
    if connection.is_closed:
        connection = pika.BlockingConnection(pika.ConnectionParameters(host=rabbitmq_host))
        channel = connection.channel()
        channel.queue_declare(queue=rabbitmq_queue)

    channel.basic_publish(exchange='',
                          routing_key=rabbitmq_queue,
                          body=flight_info)
    print(f" [x] Sent {flight_info}")

if __name__ == '__main__':
    app.run(debug=True)