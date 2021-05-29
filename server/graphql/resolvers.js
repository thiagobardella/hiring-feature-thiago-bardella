import {
  getAllCompanies,
  createCompany,
  findCompanyById,
} from "../company/company.resolver.js";

export const resolvers = {
  Query: {
    getAllCompanies,
    findCompanyById,
  },
  Mutation: {
    createCompany,
  },
};
