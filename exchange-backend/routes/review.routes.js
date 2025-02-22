const express = require('express');
const reviewController = require('../controllers/review.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', reviewController.getAllReviews);

router.get('/:id', reviewController.getReviewById);

router.post('/', reviewController.createReview);

module.exports = router;