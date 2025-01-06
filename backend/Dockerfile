FROM amazoncorretto:17.0.13-al2023-headless
COPY ./target/*.jar /app/project2.jar
EXPOSE 8080
WORKDIR /app
CMD ["java", "-jar", "project2.jar"]