Backend Installation (Spring Boot)

    Prerequisites: JDK 17+, Maven, MySQL.
    Database: Start your MySQL instance. Use the configuration from your application.properties:
        DB Name: m223-demo
        Port: 3306
    Run: Execute ./mvnw spring-boot:run in the terminal. The API will start at http://localhost:8080.

  Frontend Installation (React)

    Prerequisites: Node.js (v16+).
    Setup:
        npm install (to install dependencies like axios, react-router-dom).
        Check src/services/api.js to ensure the baseURL matches your backend (http://localhost:8080/api).
    Run: npm start or npm run dev.
