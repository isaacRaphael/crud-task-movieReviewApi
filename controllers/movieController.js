const mongoose = require('mongoose')
const Movies = require('../models/Movie')

const getAll =  async (req, res) => {
    const movieList = await Movies.find().populate('reviews')
    console.log(movieList)
    res.json(movieList)
}

const getById = async (req, res) => {
    if(!req.params.movieId)
        return res.status(400).json({success : false , mesagge : "id is required"})
    
    const foundMovie =  await Movies.findById(req.params.movieId).populate('reviews')
    if(!foundMovie)
        return res.status(404).json({success : false, message : "no movie matches id"})

    res.status(200).json(foundMovie)
}

const add = async (req, res) => {
    const { title, releaseDate, directorName, synopsis} = req.body
    if(!title || !releaseDate)
        return res.status(400).json({success : false, message : "title and releaseDate are required"})
    try {const movie =  await Movies.create({
        title,
        releaseDate,
        directorName,
        synopsis
    })
       let completed = await movie.save()
       if (completed)
            res.json({success : true , mesagge : "created successfully", movie})
    } catch(err)
    {
        console.log(err)
        res.status(500).json({success : false , mesagge : "could not complete", error : err.message})
    }
}

const updateMovie = async (req, res) => {
    if(!req.params.movieId)
        return res.status(400).json({success : false, message : "id is required"})
    
    const foundMovie = await Movies.findById(req.params.movieId)
    if(!foundMovie)
        return res.status(404).json({success : false, message : "movie not found"})
    try {
        Object.assign(foundMovie, req.body);
        await foundMovie.save()
        res.json({success : true, message : "updated"})
    } catch(err)
    {
        console.log(err)
        res.status(500).json({success : false, message : "could not complete", error : err.message})
    }
    
}


const deleteMovie = async (req, res) => {
    if(!req.params.movieId)
        return res.status(400).json({success : false, message : "id is required"})

    const foundMovie = await Movies.findById(req.params.movieId)
    if(!foundMovie)
        return res.status(400).json({success : false, message : "movie not found"})

    await foundMovie.remove()
    res.sendStatus(204)
}





module.exports = { getAll, getById, deleteMovie, add, updateMovie}