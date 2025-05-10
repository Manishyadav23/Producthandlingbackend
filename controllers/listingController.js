const { validationResult } = require('express-validator');
const Listing = require('../models/Listing');

exports.createListing = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  
  let imagePaths = [];
  if (req.files && req.files.length > 0) {
    imagePaths = req.files.map(file => file.path);
  }

  const newListing = new Listing({
    ...req.body,
    images: imagePaths 
  });

  try {
    await newListing.save();
    res.status(201).json({ message: 'Listing created successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while saving listing.' });
  }
};



exports.getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching listings." });
  }
};


exports.getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching listing." });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const updatedData = {
      ...req.body,
    };

    if (imagePaths.length > 0) {
      updatedData.images = imagePaths;
    }

    const listing = await Listing.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!listing) return res.status(404).json({ error: "Listing not found" });

    res.status(200).json({ message: "Listing updated successfully", listing });
  } catch (err) {
    res.status(500).json({ error: "Server error while updating listing." });
  }
};


exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ error: "Listing not found" });

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error while deleting listing." });
  }
};
