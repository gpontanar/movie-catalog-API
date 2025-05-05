const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    comment: { type: String, required: true }
});

// const movieSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     director: { type: String, required: true },
//     year: { type: Number, required: true },
//     description: { type: String, required: true },
//     genre: { type: String, required: true },
//     comments: [commentSchema]
// });
const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    director: { type: String, required: true },
    year: { type: Number, required: true },
    description: { type: String, required: true },
    genre: { type: String, required: true },
    image: { type: String, required: false }, 
    comments: [commentSchema]
});

module.exports = mongoose.model('Movie', movieSchema);