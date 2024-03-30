### API Design with Docker, Express, PostgreSQL, Redis, Swagger, X and Prisma
  This project demonstrates an application setup using Docker, Express.js for the API, PostgreSQL as the relational database, Redis for caching, and Swagger for API documentation. The application provides an endpoint to fetch articles, caching the most recently fetched articles in Redis.

### Prerequisites
  Before you begin, ensure you have the following installed on your system:
  - Docker and Docker Compose
  - Node.js (for local development and testing)

### Getting Started
  ### Clone the Repository
  First, clone the repository to your local machine:

    git clone api-design-redis-docker

  cd api


## Running with Docker Compose
  To start the application with Docker Compose, run the following command in the root directory of the project:

    docker-compose up --build

  This command builds the Docker images and starts the containers defined in your docker-compose.yml. The --build option ensures that Docker rebuilds the images if there are any changes.

### Accessing the Application
  Once the containers are up and running, you can access the API at http://localhost:5000.

  The Swagger UI documentation is available at http://localhost:5000, providing an interactive interface to explore the API endpoints.

## Seeding the Database
  To seed the database with initial data, you can use the /articles/seed endpoint:

    curl -X POST http://localhost:5000/articles/seed

  This will populate the database with sample articles.

## Fetching an Article
  To fetch an article by its ID, use the /articles/:articleId endpoint, replacing :articleId with the actual ID of the article:

    curl http://localhost:5000/articles/1

  If the article has been fetched recently, it will be served from Redis cache; otherwise, it will be fetched from the PostgreSQL database and then cached in Redis.

## Development
## Running Migrations Locally
  To apply database migrations locally, ensure you have a PostgreSQL instance running and set up the .env file with the appropriate DATABASE_URL. Then, run:

      npx prisma migrate dev

  This command applies migrations to your database, syncing it with your Prisma schema.

## Generating Swagger Documentation
  To generate the Swagger documentation based on your routes, run:

    npm run swagger-autogen

  This generates a swagger-output.json file, which is used by Swagger UI to render the documentation.

## Testing the Application
  To test the application's API endpoints, ensure you have Jest and Supertest installed as development dependencies. You can run the tests using the following command:

    npm test

  This will execute the test suites defined in your project, testing functionalities such as database seeding and fetching articles.

## Troubleshooting

  ### Database Connection Issues:
  Ensure the PostgreSQL service is ready and accessible. Check the DATABASE_URL environment variable for correctness.

  ### Redis Connection Issues:
  Verify the Redis service is up and the REDIS_HOST environment variable is set correctly in your Docker Compose configuration.

  ### Swagger Documentation Not Updating:
  After making changes to your API routes, rerun the Swagger autogen script to update the documentation.

### Contributing
  Feel free to fork the repository and submit pull requests with improvements or fixes.
