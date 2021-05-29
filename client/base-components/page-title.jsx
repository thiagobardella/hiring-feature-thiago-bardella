import styled from "styled-components";

export const PageTitle = styled.p`
  && {
    margin: 0;
    font-size: ${(props) => props.theme.typography.title.size};
    color: ${(props) => props.theme.typography.title.color};
    font-weight: ${(props) => props.theme.typography.title.weight};
  }
`;
