import { useQuery } from "@apollo/client";
import { Col, message, Row, Skeleton, Tag } from "antd";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../base-components/button";
import { List } from "../../base-components/list";
import { PageTitle } from "../../base-components/page-title";
import { BenefitLabels } from "../../constants";
import { GET_ALL_COMPANIES } from "../../graphql/queries";

const columns = [
  {
    title: "Nome",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "Nome fantasia",
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
    render: (benefits) => (
      <>
        {benefits.map((benefit) => (
          <Tag key={benefit}>{BenefitLabels[benefit]}</Tag>
        ))}
      </>
    ),
  },
];

const CompaniesPage = () => {
  const history = useHistory();

  const {
    loading: companiesLoading,
    data: companiesData,
    fetchMore,
  } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: "cache-and-network",
    onError: (err) => message.error(err.message),
  });
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleRowClick = (record) => (_event) => {
    history.push(`/companies/${record.id}`);
  };

  const handleRow = (record) => {
    return {
      onClick: handleRowClick(record),
    };
  };

  const handleCreateCompany = (_event) => {
    history.push(`/create-company`);
  };

  const handlePageChange = async (page) => {
    await fetchMore({
      variables: {
        offset: (page - 1) * 6,
      },
    });
  };

  return (
    <>
      <Row align="middle" gutter={[24, 24]}>
        <Col>
          <PageTitle>Empresas</PageTitle>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleCreateCompany}
            color="secondary"
          >
            Criar empresa
          </Button>
        </Col>
        <Col span={24}>
          {isLoadingMore ? (
            <Skeleton active />
          ) : (
            <List
              loading={companiesLoading}
              pagination={{
                pageSize: 6,
                hideOnSinglePage: true,
                onChange: handlePageChange,
              }}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={companiesData?.getAllCompanies ?? []}
              onRow={handleRow}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompaniesPage;
