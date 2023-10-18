const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.mzswurt.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function runInstructions() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("devdb");
    await client.db("devdb").command({ ping: 1 });
    const collection = db.collection("recipes");

    // Use the find() method to retrieve data with specific fields (e.g., 'instructions')
    const data = await collection.find({}, { projection: { instructions: 1 } }).limit(100).toArray();
    
    // Access the 'instructions' field from the returned documents
    const instructions = data.map(recipe => recipe.instructions);

    return instructions;

  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
