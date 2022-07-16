
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewerSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    reviews : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Review'
    }]

})



module.exports = mongoose.model('Reviewer', reviewerSchema)