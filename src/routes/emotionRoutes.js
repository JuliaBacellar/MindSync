const express = require('express')
const router = express.Router();
const{addEmotion, getEmotionsByMonth} = require('../controllers/emotionController');


router.post('/', addEmotion); //post /emotion
router.get('/', getEmotionByMonth); //get //emotion'queryset'

module.exports = router;

