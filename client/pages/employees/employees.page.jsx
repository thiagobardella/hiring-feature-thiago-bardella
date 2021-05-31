import { useQuery } from "@apollo/client";
import { Col, message, Row, Tag } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../base-components/button";
import { List } from "../../base-components/list";
import { PageTitle } from "../../base-components/page-title";
import { BenefitLabels } from "../../constants";
import { GET_ALL_EMPLOYEES } from "../../graphql/queries";

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

const EmployeesPage = () => {
  const history = useHistory();

  const {
    loading: employeesLoading,
    data: employeesData,
    fetchMore,
  } = useQuery(
    GET_ALL_EMPLOYEES,
    { variables: { offset: 0 } },
    {
      fetchPolicy: "network",
      onError: (err) => message.error(err.message),
    }
  );

  const handleRowClick = (record) => (_event) => {
    history.push(`/employees/${record.id}`);
  };

  const handleRow = (record) => {
    return {
      onClick: handleRowClick(record),
    };
  };

  const handleCreateEmployee = (_event) => {
    history.push(`/create-employee`);
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
          <PageTitle>Colaboradores</PageTitle>
        </Col>
        <Col>
          <Button
            type="primary"
            onClick={handleCreateEmployee}
            color="secondary"
          >
            Criar colaborador
          </Button>
        </Col>
        <Col span={24}>
          <List
            loading={employeesLoading}
            pagination={{
              pageSize: 6,
              hideOnSinglePage: true,
              onChange: handlePageChange,
            }}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={employeesData?.getAllEmployees ?? []}
            onRow={handleRow}
          />
        </Col>
      </Row>
    </>
  );
};

export default EmployeesPage;
