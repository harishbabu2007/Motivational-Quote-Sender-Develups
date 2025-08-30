"use server";
import { MongoClient, ServerApiVersion } from "mongodb";

const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;

const uri =
  `mongodb+srv://${db_user}:${db_pass}@recipients.ilp9dzb.mongodb.net/?retryWrites=true&w=majority&appName=Recipients`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

  } finally {
    await client.close();
  }
}
run().catch(console.dir);


export default client;
