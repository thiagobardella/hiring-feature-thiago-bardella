import { DataSources } from "../graphql/apollo-server";

export async function createEmployee(_parent: any, args: any, { dataSources }: DataSources ) {
  const companies = await dataSources.companiesAPI.getCompanies(args.companies);
  return dataSources.employeesAPI.createEmployee({ ...args, companies });
}

export async function getAllEmployees(_parent: any, {}, { dataSources }: DataSources) {
  return dataSources.employeesAPI.getAllEmployees();
}

export async function findEmployeeById(_parent: any, { id }: any, { dataSources }: DataSources) {
  return dataSources.employeesAPI.findById(id);
}
