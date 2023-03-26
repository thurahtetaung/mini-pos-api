# Mini-POS System API written in Node.js with Typescript

## Running locally

- Clone the repository
- copy `.env.example` to `.env` and replace the values for your database credentials
- Run `npm install` to install all dependencies
- Run `npm run dev` to start the server

## Running in docker

- Clone the repository
- copy `.env.example` to `.env` and replace the values for your database credentials
- Run `npm run docker:build` to build the docker image
- Run `npm run docker:run` to run the docker image
- Please note that you may need to configure your docker network to allow the container to connect to your database

## Testing the API in Postman

- Import the `Mini-POS.postman_collection.json` file into Postman
- A user with the following credentials is already created in the database:
  - email: `admin@admin.com`
  - password: `admin`
- You can use this user to login and test the API
- Run the `Login` request to get the JWT token
- Copy the token and paste it into the `Authorization` header of the other requests
- Or you can set the token as Authorization header for all requests by clicking on the `Authorization` tab and selecting `API Key` from the dropdown menu and then pasting the token in the `Value` field and typing `Authorization` in the `Key` field
- You can now run the other requests
- A sample shop and some products are already created in the database during the startup of the server
