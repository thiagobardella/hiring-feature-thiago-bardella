import * as mongoose from "mongoose";
// import { MongoMemoryServer } from "mongodb-memory-server";

// const mongod = new MongoMemoryServer();

/**
 * Connect to mock memory db.
 */
export const connect = async () => {
//   const uri = await mongod.getUri();

  const mongooseOpts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  };

  return mongoose.connect('mongodb://127.0.0.1:27017/test', mongooseOpts);
};

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
//   await mongod.stop();
};

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;

  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
