FROM openjdk:8
ADD target/discover-server.jar discover-server.jar
EXPOSE 8761
ENTRYPOINT ["java","-jar", "discover-server.jar"]