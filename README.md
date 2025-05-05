# Movie-List-API

## Params
- http://localhost:4000/
# Routes and Controllers

## API Endpoints
{
    "endpoints": {
        "login":"/login",
        "register":"/register",
        "addMovie": "/addMovie",
        "getAllMovies":"/getMovies",
        "getMovieById":"/getMovie",
        "updateMovie":"/updateMovie",
        "deleteMovie":"/deleteMovie",
        "addMovieComment":"/addComment",
        "getMovieComments":"/getComments"
    }
}

## Routes:

- User Routes:   
POST /users/login - User login route. - 200 OK
- http://localhost:4000/users/login

POST /users/register - User registration route. - 201 Created   
- http://localhost:4000/users/register

- Workout Routes:

GET /movies/ - Retrieve a list of all movies - 200 OK
- http://localhost:4000/movies/getMovies

POST /movies/ - Add a new movies item. - 201 Created - 
- http://localhost:4000/movies/addMovie

GET /movies/:id - Retrieve a specific movie by its ID. - 200 OK
- http://localhost:4000/movies/getMovie/:id

PUT /movies/:id - Update an existing movie item. - 200 OK
- http://localhost:4000/movies/updateMovie/:id

DELETE /movies/:id - Delete an movies item by its ID. - 200 OK
- http://localhost:4000/movies/deleteMovie/:id

PATCH /movies/:id - Add comments for the a movie by its ID - 200 OK
- http://localhost:4000/movies/addComment/:id

GET /movies/:id - Get all comments for the a movie - 200 OK
- http://localhost:4000/movies/getComments/

## Routes Middleware

const workoutRoutes = require("./routes/movies");
const userRoutes = require("./routes/user");

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

## Backend installs:

npm install express mongoose

Install dotenv package.
npm install dotenv

Installing a bcrypt package:
 npm install bcrypt

Installing JSon Web Token/JWT Package
  npm install jsonwebtoken

# Host fitnessAPI 

# Backend API is hosted in render
- URL: 






