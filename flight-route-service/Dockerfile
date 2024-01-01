# Use the official Python image as the base image
FROM apache/spark-py

# Set the working directory in the container
WORKDIR /app

USER root
RUN pip install pyspark
RUN pip install --no-cache-dir Flask
RUN pip install findspark
RUN pip install pymongo
RUN pip install graphframes
RUN pip install pycountry

ENV PYTHONUNBUFFERED=1
COPY . /app

# Expose the port on which the Flask app will run
EXPOSE 8000

# Define the command to run your application
CMD ["python3", "app.py"]
