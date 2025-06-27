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
router.post('/', jwtAuth, async (req, res) =>{

    try{
        const {title, categories, items} = req.body;

        const newTierList = new TierList({
            title,
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




//update tierlist

//delete a tier list

//clone a tierlist