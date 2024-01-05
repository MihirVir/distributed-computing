from countryinfo import CountryInfo
from geopy.distance import great_circle
import pymongo
import os
import requests

# Read MongoDB host and port from environment variables or use default values
mongo_host = os.getenv('MONGO_HOST', 'mongo-cluster-ip-service')
mongo_port = int(os.getenv('MONGO_PORT', '27017'))

# Connect to MongoDB
mongo_client = pymongo.MongoClient(f"mongodb://{mongo_host}:{mongo_port}/")
db = mongo_client["airline1_db"]
flights_collection = db["flights"]

# how to calculate the price
def calculate_price(src_location, dest_location, rating):
    distance = great_circle(src_location, dest_location).kilometers
    if distance <= 800:
        return int((distance * 0.12 + 30) * (rating / 4.25))
    else:
        return int((distance * 0.1 + 60) * (rating / 4.25))

# get the list of all countries
countries = CountryInfo().all()

# generate flights info
flights_data = []
flight_number = 1
airline_rating = 4.25

for src_country in countries:
    src_country_info = CountryInfo(src_country)
    try:
        src_continent = src_country_info.region()
        if src_continent in ['Asia', 'Europe', 'North America']:
            for dest_country in countries:
                dest_country_info = CountryInfo(dest_country)
                if src_country_info.iso(3) != dest_country_info.iso(3):
                    try:
                        dest_continent = dest_country_info.region()
                        if dest_continent and ((src_continent == 'Asia' and dest_continent == 'Asia')):
                                src_location = src_country_info.latlng()
                                dest_location = dest_country_info.latlng()

                                if src_location and dest_location:
                                    price = calculate_price(src_location, dest_location, airline_rating)

                                    flight_info = {
                                        "type": "direct",
                                        "src": {"name": src_country, "id": src_country_info.iso(3)},
                                        "dest": {"name": dest_country, "id": dest_country_info.iso(3)},
                                        "flight_no": f"ANA{flight_number:05d}",
                                        "airline":{"name": "ANA Airline", "rating": airline_rating},
                                        "price": price
                                    }

                                    flights_data.append(flight_info)
                                    flight_number += 1

                                    print(f"processing {src_country} to {dest_country}")
                    except KeyError:
                        continue
    except KeyError:
        continue

def trigger_flight_info_api():
    try:
        url = 'http://airline1-service-cluster-ip-service:8001/api/v1/airline1-service/flights'
        response = requests.get(url)
        if response.status_code == 200:
            print("Successfully triggered the flight info API.")
        else:
            print(f"Failed to trigger the API, status code: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"HTTP Request failed: {e}")

# insert data to the database
flights_collection.insert_many(flights_data)
mongo_client.close()
print(f"Inserted {len(flights_data)} flight records into the database.")
trigger_flight_info_api()