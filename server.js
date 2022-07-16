
//Configuring my env file
require('dotenv').config()


//imports
const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const databaseConfig = require('./databaseConfig')
const app = express()
const PORT = process.env.PORT || 3500

//connect to Db
databaseConfig.connect()

//middlewares
app.use(cors())
app.use(express.json())


//adding endpoints
app.use('/', require('./routes/root'))
app.use('/api/movies', require('./routes/api/movies'))
app.use('/api/reviewers', require('./routes/api/reviewer'))
app.use('/api/reviews', require('./routes/api/reviews'))



//serve 404 error page 
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

//check for connection then start listening
mongoose.connection.once('open', () => {
    console.log('connected to mongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})