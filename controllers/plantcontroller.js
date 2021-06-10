const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { PlantModel } = require('../models');

// practice route
router.get('/practice', (req, res)=>{
    res.send('This is a test route.')
});

// Post new plant (requires sign in)
router.post('/create', validateSession, async(req, res) =>{
    const { plantName, typeOfPlant, lightingNeeds, waterNeeds, fertilizerNeeds, notes } = req.body;
    const { id } = req.user;
    const plantEntry = {
        plantName,
        typeOfPlant,
        lightingNeeds,
        waterNeeds,
        fertilizerNeeds,
        notes,
        owner_id: id
    }
    try {
        const newPlant = await PlantModel.create(plantEntry);
        res.status(200).json(newPlant);
    } catch (err) {
        res.status(500).json({msg: `On no! Server error: ${err}`})
    }
});

// Update plant (requires sign in)
// Edit plant (requires sign in)
// Delete plant (requires sign in)