// pages/api/recipes.js
// import connectMongodb from '../../libs/mongodb'; // Your database connection code

// export default async (req, res) => {
//   const { category } = req.query;

//   try {
//     const db = connectMongodb();
//     const collection = db.collection('recipes');

//     // Fetch recipes based on the category parameter
//     const recipes = await collection.find({ category }).toArray();

//     res.status(200).json(recipes);
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching recipes' });
//   }
// };
