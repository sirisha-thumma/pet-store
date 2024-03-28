Backend API Server Running:

Run Backend API server to access APIs

This App is using Pet Store API from the Swagger/OpenAPI documentation.
https://github.com/swagger-api/swagger-petstore/blob/master/src/main/resources/openapi.yaml

Its GitHub repository is: 
https://github.com/swagger-api/swagger-petstore 
  
It can be ran as: 
### `docker pull swaggerapi/petstore3:unstable`
### `docker run  --name swaggerapi-petstore3 -d -p 8080:8080 swaggerapi/petstore3:unstable`
  
Make sure backend API server is running at localhost:8080 


Run React App Locally

Clone git repository form here https://github.com/sirisha-thumma/pet-store
### `git clone https://github.com/sirisha-thumma/pet-store.git`

In the project directory, run below commands to start the server :

### `npm start`

Starts developetment server at localhost:3000, Runs the app in the development mode.\

### `npm test`

Launches the test runner in the interactive watch mode to run tests.\

Once it is running 

Navigate to localhost:3000/pet-store to access the application and explore.\


To Access Application hosted in github pages, navigate to 

https://sirisha-thumma.github.io/pet-store/ and make sure that backend server API running ate localhost:8080 as mentioned above.\



