import { useMutation, useQuery } from "@apollo/client";
import { Col, Divider, Form, Input, message, Row, Select } from "antd";
import MaskedInput from "antd-mask-input";
import React, { useState } from "react";
import { Button } from "../../base-components/button";
import { List } from "../../base-components/list";
import { PageTitle } from "../../base-components/page-title";
import { BenefitLabels } from "../../constants";
import { CREATE_EMPLOYEE, UPDATE_COMPANY } from "../../graphql/mutations";
import { GET_ALL_COMPANIES } from "../../graphql/queries";
import { Body } from "./create-employee.styles";

const columns = [
  {
    title: "Empresa",
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => b.name.localeCompare(a.name),
    sortDirections: ["ascend", "descend", "ascend"],
  },
  {
    title: "CNPJ",
    dataIndex: "cnpj",
    key: "cnpj",
  },
];

const CreateEmployeePage = () => {
  const [form] = Form.useForm();
  const [benefitOptions, setBenefitOptions] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [createEmployee, { loading: creating }] = useMutation(CREATE_EMPLOYEE);
  const [addEmployees, { loading: updating }] = useMutation(UPDATE_COMPANY);

  const {
    loading: companiesLoading,
    data: companiesData,
    fetchMore,
  } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: "cache-and-network",
    onError: (err) => message.error(err.message),
  });

  const handleSubmit = async (values) => {
    try {
      values.companies = selectedRowKeys;
      const employeeDb = await createEmployee({ variables: values });
      for (const company of selectedRowKeys) {
        await addEmployees({
          variables: {
            companyId: company,
            employeeIds: [employeeDb.data.createEmployee.id],
          },
        });
      }
      form.resetFields();
      setSelectedRowKeys([]);
      message.success("Colaborador criado com sucesso!");
    } catch (err) {
      message.error(err.message);
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    form.resetFields(["chosenBenefits"]);
    const chosenCompanies = companiesData?.getAllCompanies.filter((company) =>
      selectedRowKeys.includes(company.id)
    );
    const allBenefits = chosenCompanies.flatMap(
      (company) => company.chosenBenefits
    );
    if (allBenefits) {
      setBenefitOptions(
        [...new Set(allBenefits)].map((benefit) => ({
          label: BenefitLabels[benefit],
          value: benefit,
        }))
      );
    }
    setSelectedRowKeys(selectedRowKeys);
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
      <Row justify="flex-start" align="middle" gutter={[0, 24]}>
        <Col>
          <PageTitle>Novo colaborador</PageTitle>
        </Col>
        <Col span={24}>
          <Body>
            <Row justify="flex-start">
              <Col xs={24} sm={18} md={18} lg={12} xl={12}>
                <Form onFinish={handleSubmit} form={form} layout="vertical">
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="CPF"
                    name="cpf"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <MaskedInput mask="111.111.111-11" name="cpf" />
                  </Form.Item>
                  <Form.Item
                    label="Endereço"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Telefone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <MaskedInput
                      mask="(11) 11111 1111"
                      name="phone"
                      placeholderChar=" "
                    />
                  </Form.Item>
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
                    rowSelection={{
                      selectedRowKeys,
                      onChange: onSelectChange,
                    }}
                  />
                  <Form.Item
                    label="Benefícios"
                    name="chosenBenefits"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Selecionar"
                      options={benefitOptions}
                      disabled={!benefitOptions?.length}
                    />
                  </Form.Item>
                  <Divider />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      color="secondary"
                      loading={creating || updating}
                    >
                      Criar colaborador
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Body>
        </Col>
      </Row>
    </>
  );
};

export default CreateEmployeePage;
