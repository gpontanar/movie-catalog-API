const Movie = require('../models/Movie');


// Creating a Movie for Admin
module.exports.addMovie = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { title, director, year, description, genre } = req.body;

    try {
        const newMovie = new Movie({ title, director, year, description, genre });
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a Movie for Admin
module.exports.updateMovie = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie updated successfully', updatedMovie });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
// Delete a Movie for Admin
module.exports.deleteMovie = async (req, res) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Access denied' });
    }

    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get All Movies for all users
module.exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json({ movies });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Movie by ID for all users
module.exports.getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Add Comment to a Movie for authenticated users
module.exports.addComment = async (req, res) => {
    const { comment } = req.body;

    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        movie.comments.push({ userId: req.user.id, comment });
        await movie.save();
        res.status(200).json({ message: 'Comment added successfully', updatedMovie: movie });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get Comments from a Movie for authenticates uusers
module.exports.getComments = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id).select('comments');
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json({ comments: movie.comments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports.deleteComment = async (req, res) => {
    const { movieId, commentId } = req.params;

    try {
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Find the index of the comment to delete
        const commentIndex = movie.comments.findIndex((comment) => comment._id.toString() === commentId);
        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // Check if the logged-in user is the owner of the comment
        if (movie.comments[commentIndex].userId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own comments' });
        }

        // Remove the comment using splice
        movie.comments.splice(commentIndex, 1);

        // Save the updated movie
        await movie.save();

        res.status(200).json({ message: 'Comment deleted successfully', updatedMovie: movie });
    } catch (err) {
        console.error('Error in deleteComment:', err.message);
        res.status(500).json({ error: err.message });
    }
};