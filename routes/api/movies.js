const express = require('express');
const router = express.Router();
const movieController = require('../../controllers/movieController')

const path = require('path');


router.route("/")
        .get(movieController.getAll)
        .post(movieController.add)

router.route("/:movieId")
        .get(movieController.getById)
        .patch(movieController.updateMovie)
        .delete(movieController.deleteMovie)
        

module.exports = router