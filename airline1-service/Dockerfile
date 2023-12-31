FROM python:3.10

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

RUN pip install --no-cache-dir Flask
RUN pip install pymongo
RUN pip install countryinfo
RUN pip install geopy
RUN pip install pika

ENV PYTHONUNBUFFERED=1

# Expose the port on which the Flask app will run
EXPOSE 8001

# Define the command to run your application
CMD ["python", "app.py"]