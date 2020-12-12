FROM maven:3.5.2-jdk-8-alpine AS MAVEN_BUILD

COPY pom.xml /build/

COPY src /build/src/

WORKDIR /build/

RUN mvn clean package

FROM openjdk:8-jre-alpine

WORKDIR /app

COPY --from=MAVEN_BUILD /build/target/usermanagement-0.0.1-SNAPSHOT.jar /app/

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "usermanagement-0.0.1-SNAPSHOT.jar"]





#FROM java:8

#RUN apt-get update
#RUN apt-get install -y maven

#WORKDIR /usermanagement-service

#ADD pom.xml /usermanagement-service/code/pom.xml
#RUN ["mvn", "dependency:resolve"]
#RUN ["mvn", "verify"]

#ADD src /usermanagement-service/src
#RUN ["mvn", "package"]

#EXPOSE 8081
#CMD ["/usr/lib/jvm/java-8-openjdk-amd64/bin/java", "-jar", #"target/usermanagement-0.0.1-SNAPSHOT.jar"]
