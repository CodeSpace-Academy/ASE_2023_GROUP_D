// import { MongoClient } from 'mongodb';

// export default async function handler(req, res) {
//   const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mzswurt.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
//   const client = new MongoClient(uri);

//   if (req.method === 'GET') {
//     // Handle a GET request to retrieve instructions
//     try {
//       await client.connect();
//       const db = client.db("devdb");
//       const collection = db.collection("recipes");
//       const recipe = await collection.findOne({ _id: `recipe._${id} `}); // Replace with the actual recipe ID

//       if (recipe) {
//         const instructions = recipe.instructions;
//         res.status(200).json(instructions);
//       } else {
//         res.status(404).json({ error: 'Recipe not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to retrieve instructions data' });
//     } finally {
//       await client.close();
//     }
//   } else if (req.method === 'POST') {
//     // Handle a POST request to add an instruction
//     try {
//       const { newInstruction } = req.body;
//       await client.connect();
//       const db = client.db("devdb");
//       const collection = db.collection("recipes");
//       const recipe = await collection.findOne({ _id: `recipe._${id} ` }); // Replace with the actual recipe ID

//       if (recipe) {
//         recipe.instructions.push(newInstruction);
//         await collection.updateOne({ _id: "your-recipe-id" }, { $set: { instructions: recipe.instructions } });
//         res.status(200).json({ message: 'Instruction added successfully' });
//       } else {
//         res.status(404).json({ error: 'Recipe not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to add instruction' });
//     } finally {
//       await client.close();
//     }
//   } else if (req.method === 'PUT') {
//     // Handle a PUT request to edit instructions
//     try {
//       const { updatedInstructions } = req.body;
//       await client.connect();
//       const db = client.db("devdb");
//       const collection = db.collection("recipes");
//       const recipe = await collection.findOne({ _id: `recipe._${id} ` }); // Replace with the actual recipe ID

//       if (recipe) {
//         recipe.instructions = updatedInstructions;
//         await collection.updateOne({ _id: `recipe._${id} ` }, { $set: { instructions: updatedInstructions } });
//         res.status(200).json({ message: 'Instructions edited successfully' });
//       } else {
//         res.status(404).json({ error: 'Recipe not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to edit instructions' });
//     } finally {
//       await client.close();
//     }
//   } else if (req.method === 'DELETE') {
//     // Handle a DELETE request to remove an instruction
//     try {
//       const { instructionIndex } = req.body;
//       await client.connect();
//       const db = client.db("devdb");
//       const collection = db.collection("recipes");
//       const recipe = await collection.findOne({ _id: `recipe._${id} ` }); // Replace with the actual recipe ID

//       if (recipe) {
//         recipe.instructions.splice(instructionIndex, 1);
//         await collection.updateOne({ _id: `recipe._${id} ` }, { $set: { instructions: recipe.instructions } });
//         res.status(200).json({ message: 'Instruction removed successfully' });
//       } else {
//         res.status(404).json({ error: 'Recipe not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to remove instruction' });
//     } finally {
//       await client.close();
//     }
//   } else {
//     res.status(405).json({ error: 'Method not allowed' });
//   }
// }
