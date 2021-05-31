import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies($offset: Int) {
    getAllCompanies(first:6 offset:$offset) {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;

export const FIND_COMPANY_BY_ID = gql`
  query GetCompanyById($companyId: String!) {
    findCompanyById(id: $companyId) {
      name
      cnpj
      tradingName
      address
      chosenBenefits
      employees {
        name
        cpf
        address
        phone
        chosenBenefits
      }
    }
  }
`;

export const FIND_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($employeeId: String!) {
    findEmployeeById(id: $employeeId) {
      name
      companies {
        name
        tradingName
        cnpj
        address
        chosenBenefits
      }
    }
  }
`;

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees($offset: Int!) {
    getAllEmployees(first:6 offset:$offset) {
      id
      name
      cpf
      address
      phone
      chosenBenefits
    }
  }
`;
