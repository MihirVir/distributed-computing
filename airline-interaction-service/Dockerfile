# Use the official OpenJDK base image
FROM openjdk:21
# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/broker-0.0.1-SNAPSHOT.jar /app/broker-0.0.1-SNAPSHOT.jar

# Expose the ports
EXPOSE 8021

# Install MongoDB and RabbitMQ
#RUN apt-get update && apt-get install -y mongodb rabbitmq

# Expose MongoDB and RabbitMQ ports
#EXPOSE 27017 5672

# Command to run the application
CMD ["java", "-jar", "/app/broker-0.0.1-SNAPSHOT.jar"]