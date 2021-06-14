const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { UniqueConstraintError } = require('sequelize/lib/errors');
const { PlantModel } = require('../models');

// practice route
router.get('/practice', (req, res) => {
    res.send('This is a test route.')
});

// Post new plant (requires sign in) <CREATE>
router.post('/create', validateSession, async (req, res) => {
    const { plantName, typeOfPlant, lightingNeeds, waterNeeds, fertilizerNeeds, notes } = req.body;
    const { id } = req.user;
    const plantEntry = {
        creator: id,
        plantName,
        typeOfPlant,
        lightingNeeds,
        waterNeeds,
        fertilizerNeeds,
        notes,
    }
    try {
        const newPlant = await PlantModel.create(plantEntry);
        res.status(200).json(newPlant);
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({
                msg: 'A plant by this name has already been entered.'
            });
        } else {
            res.status(500).json({ msg: `On no! Server error: ${err}` })
        }
    }
});

// get all plant entries <READ>

router.get('/all', async (req, res) => {
    try {
        const allPlants = await PlantModel.findAll();
        res.status(200).json(allPlants);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Failed to find plants. Error: ${err}`
        })
    }
});

// get entry by plant name (plant name in address bar) <READ>
router.get('/:plantName', async (req, res) => {
    const { plantName } = req.params;
    try {
        const thisPlant = await PlantModel.findOne({
            where: { plantName: plantName }
        });
        res.status(200).json(thisPlant)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

// Update plant by name (requires sign in) <UPDATE>
router.put('/:plantName', validateSession, async (req, res) => {
    try {
        const { plantName, typeOfPlant, lightingNeeds, waterNeeds, fertilizerNeeds, notes } = req.body;

        const updatedPlant = await PlantModel.update({
            plantName,
            typeOfPlant,
            lightingNeeds,
            waterNeeds,
            fertilizerNeeds,
            notes
        }, {
            where: { plantName: req.params.plantName }
        });
        res.status(200).json({
            msg: 'plant updated!',
            updatedPlant
        });
    } catch (err) {
        res.status(500).json({ msg: `Error: ${err}` })
    }
});

// Delete plant by name (requires sign in) <DELETE>
// ! this path is not complete. Need to make it so that if you are not the user that created the plant, err message says 'this is not your plant, you cannot delete it.' Currently, it doesn't let you delete it, but it says 200 deletedPlant:0. Also need to do the same thing for if the plantName does not match a name in db
router.delete('/:plantName', validateSession, async (req, res) => {

    const { id } = req.user;
    const { plantName } = req.params;
    try {
        const deletedPlant = await PlantModel.destroy({
            where: { plantName: plantName, creator: id }

        })
        res.status(200).json({
            msg: 'Plant deleted.',
            deletedPlant: deletedPlant

        })

    } catch (err) {
        if (creator.value != id.value) {
            res.status(403).json({
                msg: 'This is not your plant, you cannot delete it.'
            })
        } else {
            res.status(500).json({
                msg: `Oh no! Server error: ${err}`
            })
        }
    }
})

module.exports = router;