import { gql } from "apollo-server";

export const typeDefs = gql`
  type Company {
    id: ID
    name: String
    tradingName: String
    cnpj: String
    address: String
    chosenBenefits: [String]
    employees: [Employee]
  }

  type Employee {
    id: ID
    name: String
    cpf: String
    address: String
    phone: String
    chosenBenefits: [String]
    companies: [Company]
  }

  type Query {
    getAllCompanies(first: Int!, offset: Int): [Company]
    getAllEmployees(first: Int!, offset: Int): [Employee]
    findCompanyById(id: String!): Company
    findEmployeeById(id: String!): Employee
  }

  type Mutation {
    createCompany(
      name: String!
      tradingName: String!
      cnpj: String!
      address: String!
      chosenBenefits: [String]!
    ): Company
    createEmployee(
      name: String!
      cpf: String!
      address: String!
      phone: String!
      chosenBenefits: [String]!
      companies: [String]
    ): Employee
    addEmployees(
      companyId: String!
      employeeIds: [String]
    ): Company
  }
`;
