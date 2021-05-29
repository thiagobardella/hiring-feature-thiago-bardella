import styled from "styled-components";
import { Table } from "antd";

export const Companies = styled(Table)`
  && {
    border-radius: 2px;
    padding: 16px;
    background: white;
    width: 100%;
    tbody tr:hover {
      cursor: pointer;
    }
  }
`;
