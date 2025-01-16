# Places Explorer Project

## Project Overview
The **Places Explorer Project** is a web application that allows users to search for places using the Google Places API and save their favorite places. The backend is built using **FastAPI** with **Neo4j** as the database, and features JWT-based authentication for security. Users can retrieve their saved places through a GraphQL endpoint.

---

## Features

### 1. Authentication System
- JWT-based authentication to secure the application.
- User registration and login functionality.
- All endpoints are protected and require a valid JWT token.

### 2. Place Search Feature
- Integration with the **Google Places API** for place search.
- Users can search for places by name or keyword.
- Display search results with:
  - Name, address, and coordinates.
  - Associated images retrieved via Google Places API.

### 3. Save Places Feature
- Users can save places from search results into a **Neo4j database**.
- Stored details include:
  - Place name
  - Address
  - Coordinates
  - Images (Google Places photo references)
  - User-to-place relationships

### 4. GraphQL Endpoint
- A single GraphQL endpoint to:
  - Retrieve all saved places by username.
  - Include place images fetched from the Google Places API.

---

## Technical Stack

### Backend
- **Framework**: FastAPI
- **Database**: Neo4j (running via Docker)
- **Authentication**: JWT
- **API Integration**: Google Places API

### Frontend
- **Framework**: React.js
- **Styling**: Tailwind CSS or Bootstrap
- **Icons**: FontAwesome / Material-UI Icons for responsive and visually appealing UI elements.
  - Example icons:
    - Search: Magnifying glass icon for the search bar.
    - Save: Bookmark icon for saving places.
    - Location: Pin icon for showing coordinates.

### Deployment
- **Docker**: For containerized Neo4j setup
- **GraphQL**: For fetching user-specific saved places

---

## Prerequisites

1. Python 3.10+
2. Docker & Docker Compose
3. Node.js & npm (for frontend development)
4. Google Cloud API Key (to access the Google Places API)
5. Neo4j Database Docker Image

---

## Installation and Setup

### Backend Setup

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/vishalraj9102/place_explorer_1.git
   cd place_explorer_1
   ```

2. **Set Up Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   SECRET_KEY=<your_jwt_secret_key>
   GOOGLE_API_KEY=<your_google_places_api_key>
   NEO4J_URI=bolt://localhost:7687
   NEO4J_USER=<neo4j_username>
   NEO4J_PASSWORD=<neo4j_password>
   ```

3. **Start Neo4j in Docker**:
   ```bash
   docker-compose up -d
   ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Run the Backend**:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend Setup

1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend**:
   ```bash
   npm start
   ```
   The frontend will be available at `http://localhost:3000`.

---

## API Endpoints

### REST Endpoints

#### Authentication
- **POST /register**: Register a new user
- **POST /login**: Login and receive a JWT token

#### Place Search
- **GET /search**: Search for places using the Google Places API

#### Save Places
- **POST /save**: Save a place to the Neo4j database

### GraphQL Endpoint
- **POST /graphql**: Retrieve saved places by username
  ```graphql
  query {
    getSavedPlaces(username: "user1") {
      name
      address
      coordinates
      images
    }
  }
  ```

---

## Neo4j Setup in Docker

1. **Pull the Neo4j Image**:
   ```bash
   docker pull neo4j
   ```

2. **Run the Container**:
   ```bash
   docker run -d --name neo4j -p 7474:7474 -p 7687:7687 -e NEO4J_AUTH=neo4j/<password> neo4j
   ```

3. Access the Neo4j Browser at `http://localhost:7474` and log in with the credentials you set.

---

## Environment Variables

- `SECRET_KEY`: Secret key for JWT authentication.
- `GOOGLE_API_KEY`: API key for accessing Google Places API.
- `NEO4J_URI`: Connection URI for Neo4j database.
- `NEO4J_USER`: Username for Neo4j database.
- `NEO4J_PASSWORD`: Password for Neo4j database.

---

## Future Improvements
- Add pagination to the GraphQL endpoint.
- Implement caching for API responses.
- Enhance error handling for API failures.
- Add unit tests for backend functionality.
- Improve frontend design with additional icons and animations.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For any questions or suggestions, feel free to reach out:
- **GitHub**: [vishalraj9102](https://github.com/vishalraj9102)
- **Email**: [vishalrajmehra95@gmail.com.com](mailto:vishalrajmehra95@gmail.com)
