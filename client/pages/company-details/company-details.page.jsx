import { useQuery } from "@apollo/client";
import { Col, message, Row, Tag } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageTitle } from "../../base-components/page-title";
import { List } from "../../base-components/list";
import { BenefitLabels } from "../../constants";
import { FIND_COMPANY_BY_ID } from "../../graphql/queries";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "CPF",
    dataIndex: "cpf",
    key: "cpf",
  },
  {
    title: "Telefone",
    dataIndex: "phone",
    key: "cpf",
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

const CompanyDetailsPage = () => {
  const { companyId } = useParams();

  const { loading: companyLoading, data: companyData } = useQuery(
    FIND_COMPANY_BY_ID,
    {
      variables: { companyId },
    },
    {
      fetchPolicy: "cache-and-network",
      onError: (err) => message.error(err.message),
    }
  );

  return (
    <>
      <Row align="middle" gutter={[24, 24]}>
        <Col>
          <PageTitle>{companyData?.findCompanyById?.name}</PageTitle>
        </Col>
        <Col span={24}>
          <List
            loading={companyLoading}
            pagination={{
              pageSize: 6,
              hideOnSinglePage: true,
            }}
            rowKey={(record) => record.cpf}
            columns={columns}
            dataSource={companyData?.findCompanyById?.employees ?? []}
          />
        </Col>
      </Row>
    </>
  );
};

export default CompanyDetailsPage;
