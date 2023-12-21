# Use the official Python image as the base image
FROM jupyter/pyspark-notebook

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app




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
CMD ["python", "app.py"]
