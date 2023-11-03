const express = require('express');
const router = express.Router();
const SpotController = require('../controllers/spots');


router.get('/spots', SpotController.getSpots);
router.get('/spots/:spotName', SpotController.getSpotName);
router.post('/calculate', SpotController.calculate);
router.get('/estimate', SpotController.estimate);

module.exports = router;
