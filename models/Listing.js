const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    isForSale: { type: Boolean, required: true },
    propertyType: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    areaSize: { type: Number, required: true },
    location: { type: String, required: true },
    images: { type: [String], required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ['available', 'sold', 'pending'], default: 'available' }, //needed? we can also add isFurnished
    isApproved: { type: Boolean },
    author: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
},
{ timestamps: true }
);

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;