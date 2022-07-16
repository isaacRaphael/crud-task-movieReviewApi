const mongoose = require('mongoose')
const Schema = mongoose.Schema


const movieSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    releaseDate : {
        type : Date,
        required : true
    },
    directorName : String,
    synopsis : String,
    reviews : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Review'
    }]
})


module.exports = mongoose.model('Movie', movieSchema)