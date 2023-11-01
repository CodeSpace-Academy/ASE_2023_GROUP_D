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

export async function runFilter(page,filter) {
  console.log(filter)
	try {
		// Connect the client to the server    (optional starting in v4.7)
		await client.connect();
		// Send a ping to confirm a successful connection
		const db = client.db("devdb");
		await client.db("devdb").command({ ping: 1 });
		const collection = db.collection("recipes");

		const skip = (page - 1) * 100
		// Use the find() method to retrieve data
		const data = await collection.find(filter).skip(skip).limit(5).toArray();
		// return data.slice(0, limit);
		return data

	} catch (error) {
		console.error("Failed to connect to MongoDB:", error);
	 } finally {
		// Ensures that the client will close when you finish/error
		await client.close();

	}
}



