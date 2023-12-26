from flask import Flask, request, jsonify
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
import bcrypt
import os
app = Flask(__name__)

mongo_uri = os.environ["MONGO_HOST"]
mongo_port = int(os.environ["MONGO_PORT"])
database_name = "mydatabase"
user_collection = "users"

try:
    client = MongoClient(mongo_uri, mongo_port)
    db = client[database_name]
    collection = client[user_collection]
    print("Connected to Mongo")
except ConnectionFailure:
    print("Connection Failure")


user = []

@app.route("/api/v1/user/")
def hello_user():
    return "Hello World"

@app.route("/api/v1/user/register", methods=["POST"])
def register_user():
    if request.method == "POST":
        user_data = request.get_json()

        name = user_data.get("name")
        email = user_data.get("email")
        password = user_data.get("password")
        
        hashed_password = bcrypt.hashpw(password.encode("UTF-8"), bcrypt.gensalt())

        user.append({
            'name': name,
            'email': email,
            'password': hashed_password.decode("UTF-8")
        })

        print(f"{name} {email} {password} {hashed_password}")
        return jsonify({
            'message': "User was successfully created"
        })

@app.route("/api/v1/user/login")
def login_user():
    return "Login User"

@app.route("/api/v1/user/current-user", methods = ["GET"])
def get_current_user():
    return jsonify(user)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)
