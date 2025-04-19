const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: String,
  description: String,
  suitableSoilTypes: [String],
  suitableSeasons: [String],
  waterRequirements: String, // 'High', 'Medium', 'Low'
  averageInvestment: Number,
  growthDuration: Number, // in days
  commonPests: [String],
  images: [String],
  suitabilityScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('Crop', cropSchema);