import { MongoClient } from "mongodb";
import { testing } from "./istesting.js";

export async function connectToDatabase() {
 
  const production = `mongodb+srv://pablo:${process.env.mongodb_password}@cluster0.r55ekml.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
  const navDb = 'mongodb+srv://aryabiglari2002:V4ab4wzVukn91LrO@cluster0.ttprn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const dbLink = testing ? navDb : production;

  const client = await MongoClient.connect(dbLink);

  return client;
}

// other:
// `mongodb+srv://${process.env.mongodb_user}:${process.env.mongodb_password}@${process.env.mongodb_clusterName}.t5zrp2c.mongodb.net/?retryWrites=true&w=majority`
// 