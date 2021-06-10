const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { GardenModel } = require('../models');

// add plant to your garden <CREATE>
// ? how do we get data from plant table into garden
router.post('/create', validateSession, async(req, res) =>{
    const { plantName, typeOfPlant, lightingNeeds, waterNeeds, fertilizerNeeds, notes } = req.plant; //! maybe this?
    const { id } = req.user.id;
    const gardenEntry = {
        plantName,
        typeOfPlant,
        lightingNeeds,
        waterNeeds,
        fertilizerNeeds,
        notes,
        Garden_id: id
    }
    try {
        const newGarden = await GardenModel.create(gardenEntry);
        res.status(200).json(newGarden);
    } catch (err) {
        res.status(500).json({msg: `On no! Server error: ${err}`})
    }
});


// see all plants from your garden <READ>
// see individual plant from your garden <READ>
// remove plant from your garden <DELETE>

//add notes to your plant <CREATE>
// see notes from your garden plant <READ>
// edit notes from garden plant <UPDATE>
// delete notes from garden plant <DELETE>