FROM openjdk:11-jre-slim

WORKDIR /app

COPY ./target/email-1.0-SNAPSHOT.jar ./email.jar
EXPOSE 7999

CMD ["java", "-jar", "./email.jar"]