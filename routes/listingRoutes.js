const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  createListing,
  getAllListings,
  getListingById,
  updateListing,
  deleteListing
} = require('../controllers/listingController');

router.post('/listings', upload, createListing);

router.get('/listings', getAllListings);

router.get('/listings/:id', getListingById);

router.put('/listings/:id', upload, updateListing);

router.delete('/listings/:id', deleteListing);

module.exports = router;
