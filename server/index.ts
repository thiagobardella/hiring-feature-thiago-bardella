import dotenv from "dotenv";
import { dbConnect } from "./database";
import { apolloServer } from "./graphql/apollo-server";

dotenv.config();

const start = async () => {
  await dbConnect();

  apolloServer()
    .listen(3000)
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    });
};

start();
