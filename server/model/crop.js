const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  name: { type: String, required: true },
  scientificName: String,
  type:{ type: String, required: true }, // 'Vegetable', 'Fruit', 'Grain', etc.
  description :{type:String},
  soilTypes: [String],
  seasons: [String],
  water: String, // 'High', 'Medium', 'Low'
  investment: Number,
  duration: Number, // in days
  pests: [String],
  // images: [String],
  // suitabilityScore: { type: Number, default: 0 }
});

module.exports = mongoose.model('Crop', cropSchema);