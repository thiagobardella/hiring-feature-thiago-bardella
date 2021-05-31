import companyModel from "../company/company.model";
import employeeModel from "../employee/employee.model";
import { ApolloServer } from "apollo-server";
import { CompaniesAPI } from "../company/company.data-source";
import { EmployeesAPI } from "../employee/employee.data-source";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

export interface DataSources {
  dataSources: {
    companiesAPI: CompaniesAPI,
    employeesAPI: EmployeesAPI,
  }
}

export const apolloServer = () =>
  new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    dataSources: () => ({
      companiesAPI: new CompaniesAPI(companyModel),
      employeesAPI: new EmployeesAPI(employeeModel),
    }),
  });
