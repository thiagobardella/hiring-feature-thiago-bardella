import { IEmployee } from "../employee/employee.model";
import { DataSources } from "../graphql/apollo-server";

export async function createCompany(_parent: any, args: any, { dataSources }: DataSources) {
  return dataSources.companiesAPI.createCompany(args);
}

export async function addEmployees(_parent: any, { companyId, employeeIds }: any, { dataSources }: DataSources) {
  const employees = await dataSources.employeesAPI.getEmployees(employeeIds);
  return dataSources.companiesAPI.addEmployees(companyId, employees?.filter(employee => employee && (employee as IEmployee).id));
}

export async function getAllCompanies(_parent: any, {}, { dataSources }: DataSources) {
  return dataSources.companiesAPI.getAllCompanies();
}

export async function findCompanyById(_parent: any, { id }: any, { dataSources }: DataSources) {
  return dataSources.companiesAPI.findById(id);
}
