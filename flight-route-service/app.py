from flask import Flask, jsonify,request
import pymongo
import os
import random
import pycountry
import findspark

app = Flask(__name__)


findspark.init()

from pyspark.sql import SparkSession
from pyspark import SparkConf
from pyspark.sql.types import StructType, StructField, StringType, IntegerType
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
        "price": 500
    },
    {
        "src": "IRL",
        "dest": "CHN",
        "flight_no": "lol2",
        "airline": "emirates",    
        "price" : 200
    }
]

trip_collection.insert_many(trips_data)


@app.route('/api/v1/flight-routes-service/countries', methods=['GET'])
def get_countries():

    
    sources = trip_collection.distinct("src")
    destinations = trip_collection.distinct("dest") 

    return jsonify({"src":sources, "dest":destinations})



@app.route('/api/v1/flight-routes-service/flight_routes', methods=['GET'])
def flight_routes():

    request_data = request.get_json()

    dest = request_data.get("dest")
    src = request_data.get("src")
    

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
    ])

    data = [tuple(doc.values()) for doc in trip_collection.find({},{"_id":0})]
    trip_df = spark.createDataFrame(data, schema=schema)

    tripGraph = GraphFrame(df, trip_df)
    flight_routes = []
    motifs = tripGraph.find("(a)-[e]->(b); (b)-[e2]->(c)").filter("a.id == '{}' and c.id == '{}'".format(src,dest))
    motifs.show()
    for row in motifs.rdd.collect():
        print(row.a['id'])
        print(row.e['flight_no'])

        flight_routes.append({"src":{"id":row.a['id'],"name":row.a['name']}, "layover":{"id":row.b['id'],"name":row.b['name']}, "dest":{"id":row.c['id'],"name":row.c['name']},
                               "flights":[{"flight_no" : row.e['flight_no'],"airline": row.e['flight_no']},{"flight_no" : row.e2['flight_no'],"airline": row.e2['flight_no']}],
                               "price" : int(row.e["price"]) + int(row.e2["price"]), "type" : "layover"        
                               })
    return jsonify(flight_routes)


if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8000,debug=True)