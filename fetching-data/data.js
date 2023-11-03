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
		await client.connect();
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
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();

	}
}

export async function run1() {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("categories");
		const data = await collection.find({}).toArray();
		const dataArray = data.map(document => document.categories);

		return dataArray;


	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}

export async function run2() {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("allergens");
		const data = await collection.find({}).toArray();
		const dataArray = data.map(document => document.allergens);

		return dataArray;


	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}



export async function runFilter(page, filter) {
	try {
	  await client.connect();
	  const db = client.db("devdb");
	  await client.db("devdb").command({ ping: 1 });
	  const collection = db.collection("recipes");
  
	  const skip = (page - 1) * 100;
  
	  // Include filtering by steps if provided in the filter object
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
  




export async function runSortDate(page) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find(sort).skip(skip).limit(100).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	 } finally {
		// Ensures that the client will close when you finish/error
		await client.close();

	}
}

export async function runFav(page) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await client.connect();
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
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();

	}
}

export async function insertFavOrHistory(collection, document) {
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await client.connect();
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
		await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		const result = await db.collection("favourites").deleteOne(recipe);
		return console.log("deleted");
	} catch (error) {
		console.error("Failed to connect to MongoDB To save favourites", error);
	}
 }