import styled from "styled-components";
import { Button as AntdButton } from "antd";

export const Button = styled(AntdButton)`
  && {
    padding-top: 6px;
    border-color: ${(props) =>
      props.type !== "ghost"
        ? "transparent"
        : props.theme.palette.button[props.color ?? "primary"]};
    transition: opacity 0.2s;
    background: ${(props) =>
      props.type === "ghost"
        ? "transparent"
        : props.theme.palette.button[props.color ?? "primary"]};
    :hover {
      border-color: ${(props) =>
        props.type !== "ghost"
          ? "transparent"
          : props.theme.palette.button[props.color ?? "primary"]};
      background: ${(props) =>
        props.type === "ghost"
          ? "transparent"
          : props.theme.palette.button[props.color ?? "primary"]};
      opacity: 0.8;
    }
    color: ${(props) =>
      props.type === "ghost"
        ? props.theme.palette.button[props.color ?? "primary"]
        : "white"};
    font-weight: ${(props) => props.theme.typography.title.weight};
  }
`;
