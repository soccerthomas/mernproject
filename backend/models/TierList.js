import mongoose from 'mongoose';

// Tag schema for reusable tag structure
const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    color: {
        type: String,
        default: "border-gray-500"
    }
});

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false,
    },
    tags: [tagSchema]
});

const categorySchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "#FFFFFF"
    },
    items: [itemSchema]
});

const tierListSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [categorySchema],
    unassignedItems: [itemSchema],
    // Global tags for this tier list
    globalTags: [tagSchema]
}, {
    timestamps: true
});

// Create a separate Tag model for global tag management
const Tag = mongoose.model('Tag', tagSchema);
const TierList = mongoose.model('TierList', tierListSchema);

export default TierList;
export { Tag };
