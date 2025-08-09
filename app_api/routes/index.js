const express = require("express");
const router = express.Router();

const tripsController = require("../controllers/trips");

router.route("/trips").get(tripsController.tripsList);

router 
    .route('/trips')
    .get(tripsController.tripsList)
    .post(travelController.tripsAddTrip); //PoOST method adds trip
   

router 
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);


module.exports = router;