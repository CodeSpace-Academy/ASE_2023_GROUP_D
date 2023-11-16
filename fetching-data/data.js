const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

export async function run(page) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find({}).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
	//finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();
	// }
}

export async function runCategories() {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("categories");
		const data = await collection.find({}).toArray();
		const dataArray = data.map(document => document.categories);

		return dataArray;


	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
	//  finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();
	// }
}

export async function run2() {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("allergens");
		const data = await collection.find({}).toArray();
		const dataArray = data.map(document => document.allergens);

		return dataArray;


	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
	//  finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();
	// }
}

export async function runFilter(page, filter) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find(filter).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
	//finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();

	// }
}

export async function runFilter2(page, filter, sort) {

	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find(filter).sort(sort).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
	//finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();

	// }
}

export async function runSortDate(sortPublished) {
	try {
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const data = await collection.find().skip(skip).limit(100).toArray();

		if (sortPublished === 'ascending') {
			data.sort((a, b) => a.published - b.published);
		} else if (sortPublished === 'descending') {
			data.sort((a, b) => b.published - a.published);
		} else {
			throw new Error('Invalid sorting order. Use "ascending" or "descending".');
		}

		return data;
	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
		throw error;
	}
}


export async function runFav(page) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("favourites");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find({}).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	}
	//finally {
	// 	// Ensures that the client will close when you finish/error
	// 	await client.close();

	// }
}

export async function insertFavOrHistory(collection, document) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		// await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		const result = await db.collection(collection).insertOne(document);

		return result;
	} catch (error) {
		console.error("Failed to connect to MongoDB To save favourites", error);
	}
}

export async function DeleteFav(recipe) {
	try {
		// Connect the client to the server    (optional starting in v4.7)

		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		const result = await db.collection("favourites").deleteOne(recipe);
		return console.log("deleted");
	} catch (error) {
		console.error("Failed to connect to MongoDB To save favourites", error);
	}
}

export async function runUpdateInstructions(recipeId, updatedInstruction) {
	const db = client.db('devdb');
	const collection = db.collection('recipes');

	try {

		await collection.updateOne(
			{ _id: recipeId },
			{
				$set: { "instructions": updatedInstruction },
			},
		);

		return { success: true, message: 'Instruction updated successfully' };
	} catch (error) {
		console.error('Database update error:', error);
		throw error;
	}
}

export async function runUpdateDescription(recipeId, updatedDescription) {
	const db = client.db('devdb');
	const collection = db.collection('recipes');

	try {

		await collection.updateOne(
			{ _id: recipeId },
			{
				$set: { "description": updatedDescription },
			},
		);

		return { success: true, message: 'Description updated successfully' };
	} catch (error) {
		console.error('Database update error:', error);
		throw error;
	}
}

// export async function runInstructionsSortByLength() {
// 	try {

// 		const db = client.db('devdb');
// 		const collection = db.collection('recipes');

// 		const result = await collection.aggregate([
// 			{
// 				$unwind: "$instructions" // Deconstruct the instructions array into individual documents
// 			},
// 			{
// 				$sort: {
// 					"instructions.length": 1 // Sort by the length of the instructions array
// 					// If you want to sort in descending order, use -1 instead of 1: "instructions.length": -1
// 				}
// 			},
// 			{
// 				$group: {
// 					_id: "$_id",
// 					title: { $first: "$title" },
// 					description: { $first: "$description" },
// 					prep: { $first: "$prep" },
// 					cook: { $first: "$cook" },
// 					category: { $first: "$category" },
// 					servings: { $first: "$servings" },
// 					published: { $first: "$published" },
// 					tags: { $first: "$tags" },
// 					ingredients: { $first: "$ingredients" },
// 					images: { $first: "$images" },
// 					instructions: { $push: "$instructions" },
// 					nutrition: { $first: "$nutrition" }
// 				}
// 			},
// 			{
// 				$limit: 100 // Limit the result to 100 documents
// 			}
// 		]).toArray();
// 		console.log(result)
// 		return result;
// 	} finally {
// 		await client.close();
// 	}
// }

export async function runSortInstructionsByLength(page, sortOrder = 'asc') {
	try {
		await client.connect(); // Connect to the MongoDB server

		const db = client.db('devdb');
		const skip = (page - 1) * 100;

		// Ensure there's an index on the field used for sorting
		await db.collection('recipes').createIndex({ "instructions.length": 1 });
		const sortDirection = sortOrder.toLowerCase() === 'desc' ? -1 : 1;

		const cursor = db.collection('recipes').aggregate([
			{
				$project: {
					"_id": 1,
					"instructions": { "$ifNull": ["$instructions", [""]] }
				}
			},
			{
				$unwind: {
					"path": "$instructions",
					"includeArrayIndex": "string",  // This might not be explicitly supported in Compass
					"preserveNullAndEmptyArrays": false  // This might not be explicitly supported in Compass
				}
			},
			{
				$sort: {
					"instructions": sortDirection
				}
			},
			{ $skip: skip },
			{ $limit: 100 }
		], { allowDiskUse: true });

		const result = await cursor.toArray();
		console.log(result)

		return result

	} finally {
		await client.close();
	}
}







export async function runFilterBySteps(page, filter) {
    try {
      await client.connect();
      const db = client.db("devdb");
      await client.db("devdb").command({ ping: 1 });
      const collection = db.collection("recipes");
  
      const skip = (page - 1) * 100;
  
      let query = {};
  
      if (filter.steps) {
        query = { "instructions": { $size: filter.steps } };
      }
    
  
      const data = await collection.find(query).skip(skip).limit(100).toArray();
  
      return data;
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
    } finally {
      await client.close();
    }
  }