from flask import Flask, jsonify,request
import pymongo
import os
import random
import pycountry
import findspark
import threading
import time

app = Flask(__name__)


findspark.init()

from pyspark.sql import SparkSession
from pyspark import SparkConf
from pyspark.sql.types import StructType, StructField, StringType, IntegerType, DoubleType
from graphframes import GraphFrame

conf = SparkConf()
conf.set("spark.jars.packages", "graphframes:graphframes:0.8.3-spark3.5-s_2.12")
conf.set("spark.sql.repl.eagerEval.enabled", True) #  This will format our output tables a bit nicer when not using the show() method


spark = SparkSession.builder.master("local[*]").config(conf=conf).getOrCreate()
spark

# MongoDB connection details
mongo_host = os.environ["MONGO_HOST"]
mongo_port = int(os.environ["MONGO_PORT"])
database_name = 'mydatabase'
collection_name = 'countries'
trip_collection_name = 'trips'
# # Connect to MongoDB
client = pymongo.MongoClient(mongo_host, mongo_port)
database = client[database_name]
collection = database[collection_name]
trip_collection = database[trip_collection_name]

countries_data = []
collection.delete_many({})
for country in pycountry.countries:
    country_data = {
        "name": country.name,
        "id": country.alpha_3, 
    }
    countries_data.append(country_data)

collection.insert_many(countries_data)

trip_collection.delete_many({})

trips_data = [
    {
        "src": "IND",
        "dest": "IRL",
        "flight_no": "lol1",  
        "airline" : "emirates",
        "price": 500,
        "rating" : 4.0
    },
    {
        "src": "IRL",
        "dest": "CHN",
        "flight_no": "lol3",
        "airline": "emirates",    
        "price" : 200,
        "rating" : 4.5
    },
    {
        "src": "IRL",
        "dest": "CHN",
        "flight_no": "RNDB",
        "airline": "eithad",    
        "price" : 400,
        "rating" : 2.2
    },
    {
        "src": "IND",
        "dest": "CHN",
        "flight_no": "ZRQN",
        "airline": "emirates",    
        "price" : 200,
        "rating" : 3.6
    }
]

trip_collection.insert_many(trips_data)


def update_flight_rating(request_data):
    time.sleep(1)
    rating = request_data.get("rating")
    flight_no = request_data.get("flight_no")
    
    flight = trip_collection.find_one({"flight_no":flight_no})
    rating_count = flight.get("rating_count",0)
    new_rating = round((flight.get("rating")*rating_count + rating)/(rating_count+1),1)
    trip_collection.update_one({"flight_no":flight_no},{"$set":{"rating":new_rating,"rating_count":rating_count+1}})


@app.route('/api/v1/flight-routes-service/flight-rating', methods=['PUT'])
def update_flight_rating_api():

    
    request_data = request.get_json()
    my_thread = threading.Thread(target=update_flight_rating,args=(request_data,))
    my_thread.start()

    return jsonify({"result":"successfully updated"})



@app.route('/api/v1/flight-routes-service/countries', methods=['GET'])
def get_countries():

    
    sources = trip_collection.distinct("src")
    destinations = trip_collection.distinct("dest") 

    return jsonify({"src":sources, "dest":destinations})



@app.route('/api/v1/flight-routes-service/flight_routes', methods=['GET'])
def flight_routes():


    dest = request.args.get("dest")
    src = request.args.get("src")
    

    schema = StructType([
    StructField("name", StringType(), True),
    StructField("id", StringType(), True),
    ])
    data = [tuple(doc.values()) for doc in collection.find({},{"_id":0})]
    df = spark.createDataFrame(data, schema=schema)

    schema = StructType([
        StructField("src", StringType(), True),
        StructField("dst", StringType(), True),
        StructField("flight_no", StringType(), True),
        StructField("airline", StringType(), True),
        StructField("price", IntegerType(), True),
        StructField("rating", DoubleType(), True),
    ])

    data = [tuple(doc.values()) for doc in trip_collection.find({},{"_id":0,"rating_count":0})]
    trip_df = spark.createDataFrame(data, schema=schema)

    tripGraph = GraphFrame(df, trip_df)
    flight_routes = []
    motifs = tripGraph.find("(a)-[e]->(b); (b)-[e2]->(c)").filter("a.id == '{}' and c.id == '{}'".format(src,dest))
    for row in motifs.rdd.collect():
        print(row.a['id'])
        print(row.e['flight_no'])

        flight_routes.append({"src":{"id":row.a['id'],"name":row.a['name']}, "layover":{"id":row.b['id'],"name":row.b['name']}, "dest":{"id":row.c['id'],"name":row.c['name']},
                               "flights":[{"flight_no" : row.e['flight_no'],"airline": row.e['flight_no'],"rating": row.e['rating']},{"flight_no" : row.e2['flight_no'],"airline": row.e2['flight_no'],"rating": row.e2['rating']}],
                               "price" : int(row.e["price"]) + int(row.e2["price"]), "type" : "layover"        
                               })
    motifs = tripGraph.find("(a)-[e]->(b)").filter("a.id == '{}' and b.id == '{}'".format(src,dest))
    for row in motifs.rdd.collect():

        flight_routes.append({"src":{"id":row.a['id'],"name":row.a['name']}, "dest":{"id":row.b['id'],"name":row.b['name']},
                               "flights":[{"flight_no" : row.e['flight_no'],"airline": row.e['flight_no'],"rating": row.e['rating']}],
                               "price" : int(row.e["price"]), "type" : "direct"        
                               })       
    return jsonify(flight_routes)


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000,debug=True)
