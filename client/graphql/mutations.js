import { gql } from "@apollo/client";

export const CREATE_COMPANY = gql`
  mutation CreateCompany(
    $name: String!
    $tradingName: String!
    $cnpj: String!
    $address: String!
    $chosenBenefits: [String!]!
  ) {
    createCompany(
      name: $name
      tradingName: $tradingName
      cnpj: $cnpj
      address: $address
      chosenBenefits: $chosenBenefits
    ) {
      id
    }
  }
`;

export const UPDATE_COMPANY = gql`
  mutation UpdateCompany(
    $companyId: String!
    $employeeIds: [String]
  ) {
    addEmployees(
      companyId: $companyId
      employeeIds: $employeeIds
    ) {
      name
      cnpj
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $name: String!
    $cpf: String!
    $address: String!
    $phone: String!
    $chosenBenefits: [String!]!
    $companies: [String]
  ) {
    createEmployee(
      name: $name
      cpf: $cpf
      address: $address
      phone: $phone
      chosenBenefits: $chosenBenefits
      companies: $companies
    ) {
      id
    }
  }
`;
