const express = require('express');
const reviewController = require('../controllers/review.controller');
const verifyToken = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', verifyToken, reviewController.getAllReviews);

router.get('/:id', verifyToken, reviewController.getReviewById);

router.post('/', verifyToken, reviewController.createReview);

module.exports = router;