import * as mongoose from "mongoose";
import { EmployeeSchema, IEmployee } from "../server/employee/employee.model";
import * as dbHandler from "./db";

beforeAll(async () => {
  await dbHandler.connect();
});

afterEach(async () => {
  await dbHandler.clearDatabase();
});

afterAll(async () => {
  await dbHandler.closeDatabase();
});

const employeeMock1 = {
  name: "EMPRESA MOCK",
  cpf: "123.123.123-12",
  address: "Rua Teste, 123",
  phone: "(11) 12312 1234",
  chosenBenefits: ["vt"],
  companies: [],
};

describe("Employee test", () => {
  it("Employee can be created correctly", async () => {
    const employeeModel = mongoose.model<IEmployee>(
      "employees",
      EmployeeSchema
    );
    await employeeModel.init();

    let employee: IEmployee = new employeeModel();
    employee.name = employeeMock1.name;
    employee.cpf = employeeMock1.cpf;
    employee.address = employeeMock1.address;
    employee.phone = employeeMock1.phone;
    employee.chosenBenefits = employeeMock1.chosenBenefits;
    employee.companies = employeeMock1.companies;
    await employee.save();

    const employeeInDb = await employeeModel
      .findOne({ name: employeeMock1.name })
      .exec();
    expect(employeeInDb?.name).toEqual(employeeMock1.name);
    expect(employeeInDb?.cpf).toEqual(employeeMock1.cpf);
  });

  it("Employee can't be created with empty values", async () => {
    const employeeModel = mongoose.model<IEmployee>(
      "employees",
      EmployeeSchema
    );
    await employeeModel.init();

    const employee: IEmployee = new employeeModel();
    employee.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["name"]
      ).not.toBeUndefined;
      expect(
        (error as mongoose.Error.ValidationError).errors["cpf"]
      ).not.toBeUndefined;
      expect(
        (error as mongoose.Error.ValidationError).errors["phone"]
      ).not.toBeUndefined;
      expect(
        (error as mongoose.Error.ValidationError).errors["address"]
      ).not.toBeUndefined;
    });

    const employeeInDb = await employeeModel.find().exec();
    expect(employeeInDb).toHaveLength(0);
  });

  it("Employee with duplicated CPF can't be created", async () => {
    const employeeModel = mongoose.model<IEmployee>(
      "employees",
      EmployeeSchema
    );
    await employeeModel.init();

    const employee1: IEmployee = new employeeModel();
    employee1.name = employeeMock1.name;
    employee1.cpf = employeeMock1.cpf;
    employee1.phone = employeeMock1.phone;
    employee1.address = employeeMock1.address;
    employee1.chosenBenefits = employeeMock1.chosenBenefits;
    employee1.companies = employeeMock1.companies;
    await employee1.save();

    const employee2: IEmployee = new employeeModel();
    employee2.name = "EMPRESA MOCK 2";
    employee2.cpf = employeeMock1.cpf;
    employee2.phone = "(11) 45678 900";
    employee2.address = "Rua Teste, 123";
    employee2.chosenBenefits = ["vt"];
    employee2.companies = [];
    employee2.save(function (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).not.toBeUndefined();
    });

    const employeesInDb = await employeeModel
      .find({ cpf: employeeMock1.cpf })
      .exec();
    expect(employeesInDb).toHaveLength(1);
  });

  it("Empoloyee with invalid CPF can't be created", async () => {
    const employeeModel = mongoose.model<IEmployee>(
      "employees",
      EmployeeSchema
    );
    const employee1: IEmployee = new employeeModel();
    employee1.name = employeeMock1.name;
    employee1.phone = employeeMock1.phone;
    employee1.cpf = "48.387.40";
    employee1.address = employeeMock1.address;
    employee1.chosenBenefits = employeeMock1.chosenBenefits;
    employee1.companies = [];
    employee1.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["cnpj"]
      ).not.toBeUndefined;
    });
  });

  it("Empoloyee with invalid Benefits can't be created", async () => {
    const employeeModel = mongoose.model<IEmployee>(
      "employees",
      EmployeeSchema
    );
    const employee1: IEmployee = new employeeModel();
    employee1.name = employeeMock1.name;
    employee1.phone = employeeMock1.phone;
    employee1.cpf = employeeMock1.cpf;
    employee1.address = employeeMock1.address;
    employee1.chosenBenefits = ["xpto"];
    employee1.companies = [];
    employee1.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["chosenBenefits.0"]
      ).not.toBeUndefined;
    });
  });

  it("Employee with invalid phone can't be created", async () => {
    const employeeModel = mongoose.model<IEmployee>(
      "employees",
      EmployeeSchema
    );
    await employeeModel.init();
    const employee: IEmployee = new employeeModel();
    employee.name = employeeMock1.name;
    employee.phone = "(11) 000";
    employee.cpf = employeeMock1.cpf;
    employee.address = employeeMock1.address;
    employee.chosenBenefits = employeeMock1.chosenBenefits;
    employee.companies = [];
    employee.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["phone"]
      ).not.toBeUndefined;
    });
  });
});
