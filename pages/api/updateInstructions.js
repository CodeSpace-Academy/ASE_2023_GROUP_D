
//import { MongoClient } from 'mongodb';

// async function handler(req, res) {

//   const uri = process.env.MONGODB_URI;

//   if (req.method === 'POST') {
//     const newInstruction = req.body.instructions;

//     try {
//       const client = await MongoClient.connect(uri);
//       const db = client.db();

//       // You need to specify which recipe to update, perhaps using an ID or other criteria.
//       //const recipeId = {recipes._id}; // Replace with the ID or criteria to identify the recipe to update.

//       const result = await db.collection('recipes').updateOne(
//         { _id: recipeId },
//         {
//           $set: {
//             instructions: newInstruction,
//           },
//         }
//       );

//       if (result.modifiedCount === 1) {
//         res.status(201).json({ message: 'Success, Instruction added to the array!' });
//       } else {
//         res.status(404).json({ message: 'Recipe not found or not updated.' });
//       }
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     } finally {
//       client.close();
//     }
//   }
// }

// export default handler;

// pages/api/update-instruction.js

import { MongoClient } from 'mongodb';
import run from '../../fetching-data/data';

async function runUpdateInstruction(recipeId, editedInstructions) {
    const db = run.client.db('devdb'); // Use the existing MongoDB client from run
    const collection = db.collection('recipes');

    try {
        // Update the instructions within the recipe document
        await collection.updateOne(
            { recipeId },
            {
                $set: { instructions: editedInstructions },
            }
        );

        return { success: true, message: 'Instructions updated successfully' };
    } catch (error) {
        console.error('Database update error:', error);
        throw error; // Rethrow the error for proper error handling in the route handler
    }
}

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { recipeId, instructions } = req.body;

            if (!instructions) {
                return res.status(400).json({ message: 'Invalid instructions format' });
            }

            const result = await runUpdateInstruction(recipeId, instructions);

            if (result.success) {
                return res.status(200).json({ message: result.message });
            } else {
                return res.status(500).json({ message: 'Internal server error' });
            }
        } catch (error) {
            console.error('Request handling error:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
};
