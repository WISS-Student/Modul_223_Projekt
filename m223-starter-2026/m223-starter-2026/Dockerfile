# build stage
FROM maven:3.9-eclipse-temurin-21-alpine AS build

COPY src /tmp/src
COPY pom.xml /tmp
RUN mvn -f /tmp/pom.xml clean test package

# deployment stage
FROM eclipse-temurin:21

COPY --from=build /tmp/target/*.jar m223-starter-0.0.1-SNAPSHOT.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "m223-starter-0.0.1-SNAPSHOT.jar"]