const mongoose = require('mongoose')
const Schema = mongoose.Schema


const reviewSchema = new Schema({
    rating : {
        type : Number,
        required : true,
        min : 1,
        max : 5
    },
    description : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : () => Date.now()
    },
    updatedAt : Date,
    movie : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Movie'
    },
    reviewer : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Reviewer'
    }
})

reviewSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next();
  });

module.exports = mongoose.model('Review', reviewSchema)