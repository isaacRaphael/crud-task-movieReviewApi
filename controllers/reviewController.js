const Reviews = require('../models/Review')
const Movies = require('../models/Movie')
const Reviewers = require('../models/Reviewer')





const getAll = async (req, res) => {
    const reviewList = await Reviews.find().populate('movie').populate('reviewer')
    res.json(reviewList)
}

const add = async (req, res) => {
  const {rating, description, movieId , reviewerId } = req.body

  if(!rating || !description || !movieId || !reviewerId)
        return res.status(400).json({success : false , mesagge : "rating , description, movieId and reviewerId are required"})

    const foundMovie = await Movies.findById(movieId)
    const foundReviewer = await Reviewers.findById(reviewerId)

 if(!foundMovie || !foundReviewer)
    return res.status(404).json({success : false , mesagge : "movie or reviewer does not exist"})

  try{
    const review = await Reviews.create({
        rating,
        description,
        movie : foundMovie._id,
        reviewer : foundReviewer._id
    })
    
    foundMovie.reviews.push(review._id)
    foundReviewer.reviews.push(review._id)

    let completed1 = await review.save()
    let completed2 = await foundMovie.save()
    let completed3 = await foundReviewer.save()
    if(completed1 && completed2 && completed3)
        res.json({success : true , mesagge : "created successfully", review})
  }catch(err)
  {
        console.log(err)
        res.status(500).json({success : false , mesagge : "could not complete", error : err.message})
  }
}


const getReviewOfMovie = async (req, res) => {
    if(!req.params.movieId)
        return res.status(400).json({success : false , mesagge : "movieId is required"})

    const foundMovie = await Movies.findById(req.params.movieId)
    if(!foundMovie)
        return res.status(404).json({success : false, message : "movie not found"})

    var reviewList = await Reviews.find().where('movie').equals(foundMovie._id)
    res.json(reviewList)

}

const getReviewOfReviewer = async (req, res) => {
    if(!req.params.reviewerId)
        return res.status(400).json({success : false , mesagge : "reviewerId is required"})

    const foundReviewer = await Reviewers.findById(req.params.reviewerId)
    if(!foundReviewer)
        return res.status(404).json({success : false, message : "Reviewer not found"})

    var reviewList = await Reviews.find().where('reviewer').equals(foundReviewer._id)
    res.json(reviewList)

}

const getById = async (req, res) => {
    if(!req.params.reviewId)
        return res.status(400).json({success : false , mesagge : "reviewId is required"})
    
    const foundReview =  await Reviews.findById(req.params.reviewId).populate('movie').populate('reviewer')
    if(!foundReview)
        return res.status(404).json({success : false, message : "no review matches id"})

    res.json(foundReview)
}

const updateReview = async (req, res) => {
    if(!req.params.reviewId)
        return res.status(400).json({success : false, message : "id is required"})
    
    const foundReview = await Reviews.findById(req.params.reviewId)
    if(!foundReview)
        return res.status(404).json({success : false, message : "Review not found"})
    try {
        Object.assign(foundReview, req.body);
        await foundReview.save()
        res.json({success : true, message : "updated"})
    } catch(err)
    {
        console.log(err)
        res.status(500).json({success : false, message : "could not complete", error : err.message})
    }
    
}

const deleteReview = async (req, res) => {
    if(!req.params.reviewId)
        return res.status(400).json({success : false, message : "reviewId is required"})
    
    const foundReview = await Reviews.findById(req.params.reviewId)

    if(!foundReview)
        return res.status(404).json({success : false, message : "review not found"})

    await foundReview.remove()
    res.sendStatus(204)
}


module.exports = { deleteReview, getById, getReviewOfReviewer, getReviewOfMovie, add , updateReview, getAll}