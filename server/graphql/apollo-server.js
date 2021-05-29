import companyModel from "../company/company.model.js";
import { ApolloServer } from "apollo-server";
import { CompaniesAPI } from "../company/company.data-source.js";
import { resolvers } from "../graphql/resolvers.js";
import { typeDefs } from "../graphql/schema.js";

export const apolloServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    dataSources: () => ({
      companiesAPI: new CompaniesAPI(companyModel),
    }),
  });
