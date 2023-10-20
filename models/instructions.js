import mongoose from 'mongoose'

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  instructions: [String],
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
