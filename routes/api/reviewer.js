const express = require('express');
const router = express.Router();
const reviewerController = require('../../controllers/reviwerController')

const path = require('path');


router.route("/")
        .get(reviewerController.getAll)
        .post(reviewerController.add)


router.route("/:reviewerId")
        .get(reviewerController.getById)
        .patch(reviewerController.updateReviewer)
        .delete(reviewerController.deleteReviewer)

module.exports = router