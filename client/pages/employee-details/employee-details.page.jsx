import { useQuery } from "@apollo/client";
import { Col, message, Row, Tag } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import { List } from "../../base-components/list";
import { PageTitle } from "../../base-components/page-title";
import { BenefitLabels } from "../../constants";
import { FIND_EMPLOYEE_BY_ID } from "../../graphql/queries";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Nome Fantasia",
    dataIndex: "tradingName",
    key: "tradingName",
  },
  {
    title: "CNPJ",
    dataIndex: "cnpj",
    key: "cnpj",
  },
  {
    title: "Endereço",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Benefícios",
    dataIndex: "chosenBenefits",
    key: "chosenBenefits",
    render: (benefits) => <>{benefits.map(benefit => <Tag key={benefit}>{BenefitLabels[benefit]}</Tag>)}</>,
  },
];

const EmployeeDetailsPage = () => {
  const { employeeId } = useParams();

  const { loading: employeeLoading, data: employeeData } = useQuery(
    FIND_EMPLOYEE_BY_ID,
    {
      variables: { employeeId },
    },
    {
      fetchPolicy: "network",
      onError: (err) => message.error(err.message),
    }
  );

  return (
    <>
      <Row align="middle" gutter={[24, 24]}>
        <Col>
          <PageTitle>{employeeData?.findEmployeeById?.name}</PageTitle>
        </Col>
        <Col span={24}>
          <List
            loading={employeeLoading}
            pagination={{
              pageSize: 6,
              hideOnSinglePage: true,
            }}
            rowKey={(record) => record.cpf}
            columns={columns}
            dataSource={employeeData?.findEmployeeById?.companies ?? []}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmployeeDetailsPage;
