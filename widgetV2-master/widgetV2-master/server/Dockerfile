FROM openjdk:11-jdk-slim

# run app
ARG JAR_FILE=*.jar
COPY ${JAR_FILE} app.jar

ENTRYPOINT ["java","-jar","/app.jar", "--spring.config.location=file:./application.properties"]