const Review = require('../models/review.model');

exports.getAllReviews = async(req, res) => {
    try{
        const reviews = await Review.findAll();
        res.status(200).json(reviews);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.getReviewById = async(req, res) => {
    try{
        const { id } = req.params;
        const review = await Review.findByPk(id);
        if(!review){
            return res.status(404).json({ error: 'Review not found' });
        }
        res.status(200).json(review);
    } catch(error){
        res.status(500).json({ error: error.message });
    }
};

exports.createReview = async(req, res) => {
    try{
        const newReview = await Review.create(req.body);
        res.status(201).json(newReview);
    }catch (error){
        res.status(500).json({ error: error.message });
    }
}