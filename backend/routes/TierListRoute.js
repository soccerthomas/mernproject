import express from 'express';
import TierList from '../models/TierList.js';
import jwtAuth from '../config/jwtAuth.js';

const router = express.Router();

//view or retireve all tierlists
router.get('/', async (req, res) => {

    try{
        const tierLists = await TierList.find().sort({createdAt: -1});
        res.json(tierLists);
    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

// create a tierlist
router.post('/', jwtAuth, async (req, res) => {

    try{
        const {title, description, categories, items} = req.body;

        const newTierList = new TierList({
            title,
            description,
            categories, // these will be SABCDF
            items,      // these will be all of the items the user creates for the list
            user: req.user.id
        });

        const tierList = await newTierList.save();
        res.json(tierList);
    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

// delete a tier list
router.delete('/:id', jwtAuth, async (req, res) => {

    try{
        const tierList = await TierList.findById(req.params.id);

        if(!tierList){
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }

        if(tierList.user.toString() !== req.user.id){
            return res.status(401).json({success: false, message: 'User not authorized'});
        }

        await tierList.remove();
        res.json({message: 'Tier list deleted successfully'});

    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

//clone a tierlist
router.post('/:id', jwtAuth, async (req, res) => {

    try{
        const tierList = await TierList.findById(req.params.id);

        if(!tierList){
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }

        const newTierList = new TierList({
            title: `Copy of ${tierList.title}`,
            description: tierList.description,
            categories: tierList.categories,
            items: tierList.items,
            user: req.user.id
        });

        const savedTierList = await newTierList.save();
        res.json(savedTierList);

    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});

//update tierlist
router.put('/:id', jwtAuth, async (req, res) => {

    try{
        let tierList = await TierList.findById(req.params.id);

        if(!tierList){
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }

        if(tierList.user.toString() !== req.user.id){
            return res.status(401).json({success: false, message: 'User not authorized'});
        }

        const {title, description, categories, items} = req.body;

        if(title){tierList.title = title};
        if(description){tierList.description = description};
        if(categories){tierList.categories = categories};
        if(items){tierList.items = items};

        await tierList.save();
        res.json(tierList);

    } catch(error){
        return res.status(500).json({success: false, message: error.message});
    }
});
