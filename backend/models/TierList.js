import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: false
    },
    description:{
        type: String,
        required: false,
    }
});

const categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        default: "#FFFFFF"
    },
    items: [itemSchema]
});

const tierListSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: false
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    categories: [categorySchema],
    unassignedItems: [itemSchema]
}, {
    timestamps: true
});

const TierList = mongoose.model('TierList', tierListSchema);

export default TierList;