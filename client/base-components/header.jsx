import { Row, Col } from "antd";
import React from "react";
import styled from "styled-components";
import { Menu } from "../assets/icons/menu";

export const HeaderWrapper = styled(Row)`
  && {
    background: ${(props) => props.theme.palette.primary.dark};
    height: 190px;
    padding: 16px;
  }
`;
export const MenuIcon = styled(Menu)`
  && {
    :hover {
      cursor: pointer;
    }
  }
`;

export const Header = () => (
  <HeaderWrapper>
    <Col>
      <MenuIcon />
    </Col>
  </HeaderWrapper>
);
