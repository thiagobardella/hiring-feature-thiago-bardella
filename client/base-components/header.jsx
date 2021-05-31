import { Col, Menu as AntdMenu, Row } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Menu as IconAsset } from "../assets/icons/menu";

export const HeaderWrapper = styled(Row)`
  && {
    background: ${(props) => props.theme.palette.primary.dark};
    height: 190px;
    padding: 24px 32px;
  }
`;

const { SubMenu } = AntdMenu;

export const MenuIcon = styled(IconAsset)`
  && {
    :hover {
      cursor: pointer;
    }
  }
`;

export const Menu = styled(AntdMenu)`
  && {
    background-color: transparent;
    border-right: 0;
  }
`;

export const Header = () => {
  const history = useHistory();

  return (
    <HeaderWrapper>
      <Col>
        <Menu mode="vertical" expandIcon={() => <></>} overflowedIndicator={() => <></>}>
          <SubMenu key="sub1" icon={<MenuIcon />}>
            <Menu.Item key="0" onClick={() => history.push("/employees")}>
              Colaboradores
            </Menu.Item>
            <Menu.Item key="1" onClick={() => history.push("/companies")}>
              Empresas
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Col>
    </HeaderWrapper>
  );
};
