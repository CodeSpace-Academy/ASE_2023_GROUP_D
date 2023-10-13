const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = 
`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mzswurt.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
	serverApi: {
	version: ServerApiVersion.v1,
	strict: true,
	deprecationErrors: true,
	}
});

export async function run() {
	try {
	// Connect the client to the server    (optional starting in v4.7)
	await client.connect();
	// Send a ping to confirm a successful connection
    const db = client.db("devdb");
	await client.db("devdb").command({ ping: 1 });
    const collection = db.collection("recipes"); 

    // Use the find() method to retrieve data
    const data = await collection.find({}).limit(10).toArray();
	return data;

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
