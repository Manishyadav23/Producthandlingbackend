const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true 
    },
  description: String,
  price: {
    type: Number,
    required: true 
    },
  category: {
    type: String,
    required: true 
},
  subcategory: {
    type: String, required: true },
  images: [String],
  createdAt: { type: Date,
    default: Date.now 
}
});

module.exports = mongoose.model("Listing", listingSchema);
