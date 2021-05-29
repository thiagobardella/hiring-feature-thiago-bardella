import { gql } from "@apollo/client";

export const GET_ALL_COMPANIES = gql`
  query GetAllCompanies {
    getAllCompanies {
      id
      name
      cnpj
      tradingName
      address
      chosenBenefits
      employees
    }
  }
`;
