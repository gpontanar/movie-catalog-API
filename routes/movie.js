const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie');
const auth = require('../auth');

// This is for Admin Routes
router.post('/addMovie', auth.verify, auth.verifyAdmin, movieController.addMovie);
router.put('/updateMovie/:id', auth.verify, auth.verifyAdmin, movieController.updateMovie);
router.delete('/deleteMovie/:id', auth.verify, auth.verifyAdmin, movieController.deleteMovie);

// This is for Public Routes
router.get('/getMovies', movieController.getAllMovies);
router.get('/getMovie/:id', movieController.getMovieById);

// This is for Authenticated User Routes
router.patch('/addComment/:id', auth.verify, movieController.addComment);
router.get('/getComments/:id', auth.verify, movieController.getComments);
router.delete('/deleteComment/:movieId/:commentId', auth.verify, movieController.deleteComment);

module.exports = router;