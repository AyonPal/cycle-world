const { Spot, User } = require('../models');
const { estimateDistance, isPositiveNumber, isValidLat, isValidLon, isHour } = require('../services/utils');

module.exports = {
  async getSpotName(req, res) {
    try {
      const {spotName} = req.params
      const spot = await Spot.findOne({where: {name: spotName}, attributes: ["name", "lat", "lon", "cycle_access"]});
      if(!spot){
        return res.status(404).json({error: "No spot matched with the name"})
      }
      
      return res.status(200).json({success: true, data: {spot}});
    } catch (error) {
      return res.status(400).json({ error: 'Internal Error' });
    }
  },
  async getSpots(req, res) {
    try {
      const spots = await Spot.findAll({attributes: ["id", "name"]});
      return res.status(200).json({success: true, data: {spots}});
    } catch (error) {
        console.log(error)
      return res.status(400).json({ error: 'Internal Error' });
    }
  },
  async calculate(req, res) {
    try {
        let {spotId, userLat, userLon, speed, daily_cycle} = req.body
        if (!isValidLat(userLat)){
          return res.status(400).json({error: "Invalid Lat Value"})
        }
        if (!isValidLon(userLon)){
          return res.status(400).json({error: "Invalid Lon Value"})
        }
        if (!isPositiveNumber(speed)){
          return res.status(400).json({error: "Invalid Speed Value"})
        }
        if (!isHour(daily_cycle)){
          return res.status(400).json({error: "Invalid Cycle Per Day Value"})
        }
        const spot = await Spot.findByPk(spotId);
        if(!spot){
          return res.status(400).json({error: "Invalid Spot"})
        }
        const {username} = req.user
        let user = await User.findOne({where: {username}})
        user.userLat = userLat
        user.userLon = userLon
        user.speed = speed
        user.daily_cycle = daily_cycle
        user.destination = spot.id
        await user.save()
        return res.status(200).json({success: true, data: {}});
    } catch (error) {
        console.log(error)
      return res.status(400).json({ error: 'Internal Error' });
    }
  },
  async estimate(req, res) {
    try {
        const {username} = req.user
        let user = await User.findOne({where: {username}})
        const {userLat, userLon, daily_cycle, speed, destination} = user
        const spot = await Spot.findByPk(destination);
        if (!isValidLat(userLat)){
            return res.status(400).json({error: "User Lat Invalid"})
        }
        if (!isValidLon(userLon)){
            return res.status(400).json({error: "User Lon Invalid"})
        }
        if (!isPositiveNumber(speed)){
            return res.status(400).json({error: "User Speed Invalid"})
        }
        if (!isHour(daily_cycle)){
            return res.status(400).json({error: "User Cycle Hr per Day Invalid"})
        }
        if(!spot){
          return res.status(400).json({error: "User Destination Not set"})
        }
        if (spot.cycle_access){
            const estimatedDist = estimateDistance(userLat, userLon, spot.lat, spot.lon);
            const estimatedTime = estimatedDist / speed
            const estimatedDays = Math.ceil(estimatedTime / daily_cycle)
            return res.status(200).json({success: true, data: {time: estimatedTime.toFixed(2), days: estimatedDays.toFixed(0)}});
        }else {
            return res.status(200).json({error: "Destination Unreachable"});

        }
    } catch (error) {
      return res.status(400).json({ error: 'Internal Error' });
    }
  },
};
