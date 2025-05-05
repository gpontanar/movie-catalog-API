const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//Routes Middleware
const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");

// [SECTION] Environment Setup
require('dotenv').config(); 

const app = express();

// Enable CORS for specific origin
app.use(cors({
    origin: 'http://localhost:3000',
}));

// Connecting to MongoDB Atlas
mongoose.connect(process.env.MONGODB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// If the connection is successful, output in the console
mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use("/movies", movieRoutes);
app.use("/users", userRoutes);

// if(require.main === module){
//     app.listen(process.env.PORT || port, () => {
//         console.log(`API is now online on port ${ process.env.PORT || port }`)
//     });
// }
if(require.main === module){
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
    });
}

module.exports = {app,mongoose};

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require('cors');

// //Routes Middleware
// const movieRoutes = require("./routes/movie");
// const userRoutes = require("./routes/user");

// // [SECTION] Environment Setup
// require('dotenv').config(); 

// const app = express();

// // Connecting to MongoDB Atlas
// mongoose.connect(process.env.MONGODB_STRING);

// // If the connection is successful, output in the console
// mongoose.connection.once("open", () => console.log("We're connected to the cloud database"));

// // Allow requests from http://localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000',
// }));

// // Parse JSON requests
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use("/movies", movieRoutes);
// app.use("/users", userRoutes);

// // Start the server
// if (require.main === module) {
//     app.listen(process.env.PORT || 4000, () => {
//         console.log(`API is now online on port ${process.env.PORT || 4000}`);
//     });
// }

// module.exports = { app, mongoose };
