import {
  getAllCompanies,
  createCompany,
  addEmployees,
  findCompanyById,
} from "../company/company.resolver";

import {
  getAllEmployees,
  createEmployee,
  findEmployeeById,
} from "../employee/employee.resolver";

export const resolvers = {
  Query: {
    getAllCompanies,
    getAllEmployees,
    findCompanyById,
    findEmployeeById,
  },
  Mutation: {
    createCompany,
    createEmployee,
    addEmployees,
  },
};
