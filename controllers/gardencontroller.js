const Express = require('express');
const router = Express.Router();
const validateSession = require('../middleware/validate-session');
const { GardenModel } = require('../models');

// add plant to your garden <CREATE>
<<<<<<< HEAD
// !This will need to copy data from plant table using client side functionality
router.post('/create', validateSession, async(req, res) =>{
    const { plantName, typeOfPlant, lightingNeeds, waterNeeds, fertilizerNeeds, notes } = req.body;
    const { id } = req.user;
    const gardenEntry = {
        garden_id: id,
        plantName,
        typeOfPlant,
        lightingNeeds,
        waterNeeds,
        fertilizerNeeds,
        notes
    }
    try {
        const newGarden = await GardenModel.create(gardenEntry);
        res.status(200).json(newGarden);
    } catch (err) {
        res.status(500).json({msg: `On no! Server error: ${err}`})
    }
});

module.exports = router;
=======
// ? how do we get data from plant table into garden
// router.post('/create', validateSession, async(req, res) =>{
//     const { plantName, typeOfPlant, lightingNeeds, waterNeeds, fertilizerNeeds, notes } = req.body; //! maybe this?
//     const { id } = req.user.id;
//     const gardenEntry = {
//         plantName,
//         typeOfPlant,
//         lightingNeeds,
//         waterNeeds,
//         fertilizerNeeds,
//         notes,
//         Garden_id: id
//     }
//     try {
//         const newGarden = await GardenModel.create(gardenEntry);
//         res.status(200).json(newGarden);
//     } catch (err) {
//         res.status(500).json({msg: `On no! Server error: ${err}`})
//     }
// });

>>>>>>> 4b79d44c20b0f0a6d2f957b87a14504f871a6e8f

// see all plants from your garden <READ>
router.get('/all', validateSession, async(req, res) =>{
    const { id } = req.user;
    try {
        const allGarden = await GardenModel.findAll({
            where: { garden_id: id }
        });
        res.status(200).json(allGarden);
    } catch (err) {
        res.status(500).json({
            msg: `Oh no! Failed to find plants. Error: ${err}`
        })
    }
});
// see individual plant from your garden <READ>
router.get('/:plantName', validateSession, async(req, res)=>{
    const { plantName } = req.params;
    const { id } = req.user;
    try {
        const thisGardenPlant = await GardenModel.findOne({
            where: { plantName: plantName, garden_id: id }
        });
        res.status(200).json(thisGardenPlant)
    } catch (err) {
        res.status(500).json({ error: err })
    }
})
// remove plant from your garden <DELETE>
// ! this path is not complete. Need to make it so that if you are not the user that created the plant, err message says 'this is not your plant, you cannot delete it.' Currently, it doesn't let you delete it, but it says 200 deletedPlant:0. Also need to do the same thing for if the plantName does not match a name in db
router.delete('/:plantName', validateSession, async (req, res)=>{
    const { plantName } = req.params;
    const { id } = req.user;

    try {
        const deletedGardenPlant = await GardenModel.destroy({
            where: { plantName: plantName, garden_id: id }
        })
        res.status(200).json({
            msg: 'Log deleted.',
            deletedGardenPlant: deletedGardenPlant
        })
    } catch (err) {
        if(creator.value != id.value){
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

// edit notes from garden plant <UPDATE>
router.put('/:plantName/notes', validateSession, async(req, res)=>{
    const { plantName } = req.params;
    const { id } = req.user;
    try {
        const { notes } = req.body;
        
        const updatedNote = await GardenModel.update({
            notes}, {where: {plantName: plantName, garden_id: id }
        });
        res.status(200).json({
            msg: 'Note updated!',
            updatedNote
        });
    } catch (err) {
        res.status(500).json({msg: `Error: ${err}`})
    }
});
