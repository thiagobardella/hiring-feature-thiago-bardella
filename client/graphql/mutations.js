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
      name
      cnpj
      tradingName
      address
      chosenBenefits
    }
  }
`;
