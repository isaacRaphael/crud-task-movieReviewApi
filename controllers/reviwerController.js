const Reviewers = require('../models/Reviewer')

const getAll =  async (req, res) => {
    const reviewerList = await Reviewers.find().populate('reviews')
    console.log(reviewerList)
    res.json(reviewerList)
}

const getById = async (req, res) => {
    if(!req.params.reviewerId)
        return res.status(400).json({success : false , mesagge : "id is required"})
    
    const foundReviewer =  await Reviewers.findById(req.params.reviewerId).populate('reviews')
    console.log(foundReviewer)
    if(!foundReviewer)
        return res.status(404).json({success : false, message : "no reviewer matches id"})

    res.status(200).json(foundReviewer)
}


const add = async (req , res) => {
    const { name } = req.body
    if(!name)
        return res.status(400).json({success : false , mesagge : "name is required"})

    try {
        const reviewer = await Reviewers.create({
            name
        })
        let completed = await reviewer.save()
        if(completed)
            res.json({success : true , mesagge : "created successfully", reviewer})
    } catch(err) {
        console.log(err)
        res.status(500).json({success : false , mesagge : "could not complete", error : err.message})
    }
    
}


const updateReviewer = async (req, res) => {
    if(!req.params.reviewerId)
        return res.status(400).json({success : false, message : "id is required"})
    
    const foundReviewer = await Reviewers.findById(req.params.reviewerId)
    if(!foundReviewer)
        return res.status(404).json({success : false, message : "Reviewer not found"})
    try {
        Object.assign(foundReviewer, req.body);
        await foundReviewer.save()
        res.json({success : true, message : "updated"})
    } catch(err)
    {
        console.log(err)
        res.status(500).json({success : false, message : "could not complete", error : err.message})
    }
    
}


const deleteReviewer = async (req, res) => {
    if(!req.params.reviewerId)
        return res.status(400).json({success : false, message : "id is required"})

    const foundReviewer = await Reviewers.findById(req.params.reviewerId)
    if(!foundReviewer)
        return res.status(404).json({success : false, message : "Reviewer not found"})

    await foundReviewer.remove()
    res.sendStatus(204)

}


module.exports = { getAll, getById, deleteReviewer, add, updateReviewer }