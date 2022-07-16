const express = require('express');
const router = express.Router();
const reviewController = require('../../controllers/reviewController')


router.route("/")
        .get(reviewController.getAll)
        .post(reviewController.add)

router.route("/getReviewsOfMovie/:movieId")
        .get(reviewController.getReviewOfMovie)

router.route("/getReviewsOfReviewer/:reviewerId")
        .get(reviewController.getReviewOfReviewer)

router.route("/:reviewId")
        .get(reviewController.getById)
        .patch(reviewController.updateReview)
        .delete(reviewController.deleteReview)


module.exports = router