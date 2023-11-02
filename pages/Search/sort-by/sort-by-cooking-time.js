// import React from "react";

// function SortByCookingTime({ onCookingTimeSort, onCookingTimeFilter }) {
//   return (
//     <div>
//       <label>Sort by Cooking Time:</label>
//       <button onClick={() => onCookingTimeSort("ascending")}>Ascending</button>
//       <button onClick={() => onCookingTimeSort("descending")}>Descending</button>

//       <div>
//         <label>Filter by Cooking Time:</label>
//         <button onClick={() => onCookingTimeFilter("15")}>{"< 15 min"}</button>
//         <button onClick={() => onCookingTimeFilter("30")}>{"< 30 min"}</button>
//         <button onClick={() => onCookingTimeFilter("45")}>{"< 45 min"}</button>
//         <button onClick={() => onCookingTimeFilter("60")}>{"< 60 min"}</button>
//         <button onClick={() => onCookingTimeFilter("75")}>{"< 75 min"}</button>
//         <button onClick={() => onCookingTimeFilter("100")}>{"< 100 min"}</button>
//         <button onClick={() => onCookingTimeFilter("200")}>{"> 100 min"}</button>
//       </div>
//     </div>
//   );
// }

// export default SortByCookingTime;


const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;

// Connect to your MongoDB database
mongoose.connect('mongodb+srv://groupd:Qf30wzzSgBtwatpj@groupd.mzswurt.mongodb.net/?retryWrites=true&w=majority  ', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your recipes collection
const recipeSchema = new mongoose.Schema({
  title: String,
  cookingTime: Number, // in minutes
  // Other fields for your recipe
});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.use(express.json());

// GET recipes sorted by cooking time
app.get('/recipes', async (req, res) => {
  try {
    const { sort } = req.query;
    let filter = {};

    if (sort === '<15min') {
      filter = { cookingTime: { $lt: 15 } };
    } else if (sort === '<30min') {
      filter = { cookingTime: { $lt: 30 } };
    } else if (sort === '<45min') {
      filter = { cookingTime: { $lt: 45 } };
    } else if (sort === '<60min') {
      filter = { cookingTime: { $lt: 60 } };
    } else if (sort === '<75min') {
      filter = { cookingTime: { $lt: 75 } };
    } else if (sort === '<100min') {
      filter = { cookingTime: { $lt: 100 } };
    } else if (sort === '>100min') {
      filter = { cookingTime: { $gte: 100 } };
    }

    const recipes = await Recipe.find(filter).sort('cookingTime');

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// POST a new recipe
app.post('/recipes', async (req, res) => {
  try {
    const { title, cookingTime } = req.body;
    const recipe = new Recipe({ title, cookingTime });
    await recipe.save();
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});




