const express = require('express');
const getMovies = require('./services/notion.js');

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/api/movies', async (req, res) => {
    const movies = await getMovies();
    res.json(movies);
});

app.get('/api/movies/:index', async (req, res) => {
    const movies = await getMovies();
    if(req.params.index >= movies.length) {
        return res.status(404).json({
            error: true, message: 'Movie not found!'
        })
    }
    res.json(movies[req.params.index]);
});

app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: 'Route not found!',
    });
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));