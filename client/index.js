import React from "react";
import ReactDom from "react-dom";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./graphql/apollo-client";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { App } from "./app";

import "antd/dist/antd.css";

ReactDom.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("app")
);
