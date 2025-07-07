import express from 'express';
import TierList, { Tag } from '../models/TierList.js';
import jwtAuth from '../config/jwtAuth.js';

const router = express.Router();

// View or retrieve all tierlists
router.get('/', async (req, res) => {
    try {
        const tierLists = await TierList.find().sort({createdAt: -1});
        res.json(tierLists);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Get a specific tierlist with populated tags
router.get('/:id', async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id)
            .populate('categories.items.tags')
            .populate('unassignedItems.tags');
        
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Create a tierlist
router.post('/', jwtAuth, async (req, res) => {
    try {
        const {title, description, categories, items, unassignedItems, globalTags} = req.body;
        
        const newTierList = new TierList({
            title,
            description,
            categories: categories || [],
            unassignedItems: unassignedItems || items || [], // Support both items and unassignedItems for backward compatibility
            globalTags: globalTags || [],
            user: req.user.id
        });
        
        const tierList = await newTierList.save();
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Delete a tier list
router.delete('/:id', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        await TierList.findByIdAndDelete(req.params.id);
        res.json({message: 'Tier list deleted successfully'});
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Clone a tierlist
router.post('/:id/clone', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        
        const newTierList = new TierList({
            title: `Copy of ${tierList.title}`,
            description: tierList.description,
            categories: tierList.categories, // Contains items within categories
            unassignedItems: tierList.unassignedItems, // Items not yet categorized
            globalTags: tierList.globalTags,
            user: req.user.id
        });
        
        const savedTierList = await newTierList.save();
        res.json(savedTierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Update tierlist
router.put('/:id', jwtAuth, async (req, res) => {
    try {
        let tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        const {title, description, categories, items, unassignedItems, globalTags} = req.body;
        
        if (title) tierList.title = title;
        if (description) tierList.description = description;
        if (categories) tierList.categories = categories;
        if (items) tierList.unassignedItems = items; // For backward compatibility
        if (unassignedItems) tierList.unassignedItems = unassignedItems;
        if (globalTags) tierList.globalTags = globalTags;
        
        await tierList.save();
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Add a global tag to a tierlist
router.post('/:id/tags', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        const {name, color} = req.body;
        const newTag = {
            name,
            color: color || "#3B82F6"
        };
        
        tierList.globalTags.push(newTag);
        await tierList.save();
        
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Update a global tag in a tierlist
router.put('/:id/tags/:tagId', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        const tag = tierList.globalTags.id(req.params.tagId);
        if (!tag) {
            return res.status(404).json({success: false, message: 'Tag not found'});
        }
        
        const {name, color} = req.body;
        if (name) tag.name = name;
        if (color) tag.color = color;
        
        await tierList.save();
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Delete a global tag from a tierlist
router.delete('/:id/tags/:tagId', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        const tag = tierList.globalTags.id(req.params.tagId);
        if (!tag) {
            return res.status(404).json({success: false, message: 'Tag not found'});
        }
        
        // Remove the tag from all items first
        tierList.categories.forEach(category => {
            category.items.forEach(item => {
                item.tags = item.tags.filter(tagRef => tagRef.toString() !== req.params.tagId);
            });
        });
        
        tierList.unassignedItems.forEach(item => {
            item.tags = item.tags.filter(tagRef => tagRef.toString() !== req.params.tagId);
        });
        
        // Remove the tag from globalTags
        tierList.globalTags.pull(req.params.tagId);
        
        await tierList.save();
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Add tag to a specific item
router.post('/:id/items/:itemId/tags', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        const {tagId} = req.body;
        
        // Find the item in categories or unassignedItems
        let item = null;
        for (let category of tierList.categories) {
            item = category.items.id(req.params.itemId);
            if (item) break;
        }
        
        if (!item) {
            item = tierList.unassignedItems.id(req.params.itemId);
        }
        
        if (!item) {
            return res.status(404).json({success: false, message: 'Item not found'});
        }
        
        // Check if tag exists in globalTags
        const tagExists = tierList.globalTags.id(tagId);
        if (!tagExists) {
            return res.status(404).json({success: false, message: 'Tag not found in global tags'});
        }
        
        // Add tag if not already present
        if (!item.tags.includes(tagId)) {
            item.tags.push(tagId);
        }
        
        await tierList.save();
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

// Remove tag from a specific item
router.delete('/:id/items/:itemId/tags/:tagId', jwtAuth, async (req, res) => {
    try {
        const tierList = await TierList.findById(req.params.id);
        if (!tierList) {
            return res.status(404).json({success: false, message: 'Tier list not found'});
        }
        if (tierList.user.toString() !== req.user.id) {
            return res.status(401).json({success: false, message: 'User not authorized'});
        }
        
        // Find the item in categories or unassignedItems
        let item = null;
        for (let category of tierList.categories) {
            item = category.items.id(req.params.itemId);
            if (item) break;
        }
        
        if (!item) {
            item = tierList.unassignedItems.id(req.params.itemId);
        }
        
        if (!item) {
            return res.status(404).json({success: false, message: 'Item not found'});
        }
        
        // Remove tag from item
        item.tags = item.tags.filter(tagRef => tagRef.toString() !== req.params.tagId);
        
        await tierList.save();
        res.json(tierList);
    } catch(error) {
        return res.status(500).json({success: false, message: error.message});
    }
});

export default router;
