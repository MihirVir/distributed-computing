from flask import Flask, request, make_response, jsonify
import requests
from pymongo import MongoClient
import urllib.parse
from pymongo.errors import ConnectionFailure
import bcrypt
import datetime
import jwt
import os
app = Flask(__name__)

secret = os.environ["JWT_SECRET"]
mongo_uri = os.environ["MONGO_HOST"]
mongo_port = int(os.environ["MONGO_PORT"])

database_name = "mydatabase"
user_collection = "users"

try:
    client = MongoClient(mongo_uri, mongo_port)
    db = client[database_name]
    collection = db[user_collection]
except ConnectionFailure:
    print("OOPS can't connect to mongoDB")

user = []

@app.route("/api/v1/user/")
def hello_user():
    return "Hello World"

@app.route("/api/v1/user/register", methods=["POST"])
def register_user():
    if request.method == "POST":
        try:

            user_data = request.get_json()

            name = user_data.get("name")
            email = user_data.get("email")
            password = user_data.get("password")

            if name and email and password:
                existing_user = collection.find_one({ "email": email })
                if existing_user:
                    return jsonify({
                        "message": "User already exists"
                    }), 400
                
                # algorithm used HS256
                hashed_password = bcrypt.hashpw(password.encode("UTF-8"), bcrypt.gensalt())

                # by default active is false once user register 
                # it will be prompted to click on a link to make it active 
                # link will be provided via email 
                user = {
                    "name": name,
                    "email": email,
                    "password": hashed_password.decode("UTF-8"),
                    "active": False
                }

                saved_user = collection.insert_one(user)
                
                token = jwt.encode({"email": email, "name": name, "active": user["active"],"exp": datetime.datetime.utcnow() + datetime.timedelta(minutes=10)}, secret)

                user.pop("password")
                user["_id"] = str(saved_user.inserted_id)

                response = make_response(jsonify({
                    "message": "User Successfully created",
                    "user": user,
                    "link": f"localhost/activate?token={token}"
                }))

                email_endpoint = f"http://email-srv:7999/api/v1/email/send"
                params = {
                    "email": email,
                    "subject": "validation",
                    "msg": f"http://localhost/activate?token={token}"
                }
                response_email = requests.post(email_endpoint, params=params)

                print(response_email)
                
                return response
            
        except Exception as e:
            return jsonify({"error": str(e)}), 500

@app.route("/api/v1/user/login", methods = ["POST"])
def login_user():
    if request.method == "POST":
        try:
            user_details = request.get_json()

            email = user_details.get("email")    
            password = user_details.get("password")

            if not email or not password:
                return jsonify({
                    "message": "email or password is not provided"
                }), 400

            user = collection.find_one({ "email": email })

            if not user:
                return jsonify({
                    "message": "User not found"
                }), 400
        
            if user.get("active") == False:
                return jsonify({
                    "message": "Please click on the verfication link provided in the email"
                }), 400
            
            stored_password = user.get("password")
            is_matching_pass = bcrypt.checkpw(password.encode("UTF-8"), stored_password.encode("UTF-8"))

            if not is_matching_pass:
                return jsonify({
                    "message": "invalid username or password"
                }), 401
            token = jwt.encode({"email": email, "active": user["active"],"exp": datetime.datetime.utcnow() + datetime.timedelta(hours=10)}, secret)
            
            response = make_response(jsonify({
                "message": "user logged in"
            }))

            response.set_cookie("token", token, max_age=36000, httponly=True)

            return response
        except Exception as e:
            print(str(e))

@app.route("/api/v1/user/delete", methods = ["DELETE"])
def delete_all_users():
    deleted_users = collection.delete_many({})
    return jsonify({
        "message": "users deleted"
    })

@app.route("/api/v1/user/current-user", methods = ["GET"])
def get_current_user():
    token = request.cookies.get("token")

    if not token:
        return jsonify({
            "message": "No Valid Token Found"
        }), 401

    decoded_token = jwt.decode(token, secret, algorithms=["HS256"])

    if "email" not in decoded_token:
        return jsonify({
            "message": "Invalid Token Provided"
        }), 401

    email = decoded_token["email"]
    user =  collection.find_one({ "email": email})

    if not user:
        return jsonify({
            "message": "Something Went Wrong"
        }), 401

    user.pop("password")
    user["_id"] = str(user["_id"])
    return jsonify(user)

@app.route("/api/v1/user/active", methods = ["POST"])
def user_active():
    token = request.args.get("token")
    if token:
        try:
            decoded_token = jwt.decode(token, secret, algorithms=["HS256"])

            if "email" in decoded_token:
                email = decoded_token["email"]

                exisitng_user = collection.find_one({ "email": email })

                if exisitng_user["active"] == True:
                    return jsonify({
                        "message": "User is already active"
                    })

                updated_user = collection.update_one({  "email": email }, { "$set": { "active": True }})
                
                updated_user = collection.find_one({"email": email})

                if updated_user:
                    updated_user.pop("password")
                    updated_user["_id"] = str(updated_user["_id"])
                    return jsonify({
                        "message": "User is now active",
                        "updated_user": updated_user
                    })
                return jsonify({"message": "User not found"}), 404
            
        except jwt.ExpiredSignatureError:
            return jsonify({ "message": "Token Expired" }), 401
        
        except jwt.InvalidTokenError:
            return jsonify({ "message": "Invalid Token is Provided" }), 401
    else:
        return jsonify({ "message": "No Token Provided"}), 400

@app.route("/api/v1/user/logout", methods = ["POST"])
def clear_cookie():
    response = make_response("Cookie 'token' is cleared")
    response.set_cookie("token", '', expires = 0)
    return response
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)