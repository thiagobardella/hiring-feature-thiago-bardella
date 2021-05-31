import * as mongoose from "mongoose";
import { CompanySchema, ICompany } from "../server/company/company.model";
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

const companyMock1 = {
  name: "EMPRESA MOCK",
  tradingName: "Empresa Mock",
  cnpj: "48.387.404/0001-06",
  address: "Rua Teste, 123",
  chosenBenefits: ["vt"],
  employees: [],
}

describe("Company test", () => {
  it("Company can be created correctly", async () => {
    const companyModel = mongoose.model<ICompany>("companies", CompanySchema);
    await companyModel.init();

    let company: ICompany = new companyModel();
    company.name = companyMock1.name;
    company.tradingName = companyMock1.tradingName;
    company.cnpj = companyMock1.cnpj;
    company.address = companyMock1.address;
    company.chosenBenefits = companyMock1.chosenBenefits;
    company.employees = companyMock1.employees;
    await company.save();

    const companyInDb = await companyModel
      .findOne({ name: companyMock1.name })
      .exec();
    expect(companyInDb?.name).toEqual(companyMock1.name);
    expect(companyInDb?.tradingName).toEqual(companyMock1.tradingName);
  });

  it("Company can't be created with empty values", async () => {
    const companyModel = mongoose.model<ICompany>("companies", CompanySchema);
    await companyModel.init();

    const company: ICompany = new companyModel();
    company.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["name"]
      ).not.toBeUndefined;
      expect(
        (error as mongoose.Error.ValidationError).errors["tradingName"]
      ).not.toBeUndefined;
      expect(
        (error as mongoose.Error.ValidationError).errors["cnpj"]
      ).not.toBeUndefined;
      expect(
        (error as mongoose.Error.ValidationError).errors["address"]
      ).not.toBeUndefined;
    });

    const companyInDb = await companyModel
      .find()
      .exec();
    expect(companyInDb).toHaveLength(0);
  });

  it("Company with duplicated CNPJ can't be created", async () => {
    const companyModel = mongoose.model<ICompany>("companies", CompanySchema);
    await companyModel.init();

    const company1: ICompany = new companyModel();
    company1.name = companyMock1.name;
    company1.tradingName = companyMock1.tradingName;
    company1.cnpj = companyMock1.cnpj;
    company1.address = companyMock1.address;
    company1.chosenBenefits = companyMock1.chosenBenefits;
    company1.employees = [];
    await company1.save();

    const company2: ICompany = new companyModel();
    company2.name = "EMPRESA MOCK 2";
    company2.tradingName = "Empresa Mock 2";
    company2.cnpj = companyMock1.cnpj;
    company2.address = "Rua Teste, 123";
    company2.chosenBenefits = ["vt"];
    company2.employees = [];
    company2.save(function (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message).not.toBeUndefined();
    });

    const companiesInDb = await companyModel
      .find({ cnpj: companyMock1.cnpj })
      .exec();
    expect(companiesInDb).toHaveLength(1);
  });

  it("Company with invalid CNPJ can't be created", async () => {
    const companyModel = mongoose.model<ICompany>("companies", CompanySchema);
    const company1: ICompany = new companyModel();
    company1.name = companyMock1.name;
    company1.tradingName = companyMock1.tradingName;
    company1.cnpj = "48.387.40";
    company1.address = companyMock1.address;
    company1.chosenBenefits = companyMock1.chosenBenefits;
    company1.employees = [];
    company1.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["cnpj"]
      ).not.toBeUndefined;
    });
  });

  it("Company with invalid Benefits can't be created", async () => {
    const companyModel = mongoose.model<ICompany>("companies", CompanySchema);
    const company1: ICompany = new companyModel();
    company1.name = companyMock1.name;
    company1.tradingName = companyMock1.tradingName;
    company1.cnpj = companyMock1.cnpj;
    company1.address = companyMock1.address;
    company1.chosenBenefits = ["xpto"];
    company1.employees = [];
    company1.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["chosenBenefits.0"]
      ).not.toBeUndefined;
    });
  });

  it("Company with invalid name can't be created", async () => {
    const companyModel = mongoose.model<ICompany>("companies", CompanySchema);
    await companyModel.init();
    const company: ICompany = new companyModel();
    company.name =
      "HUGE NAME - over 100 characters ......................................................................";
    company.tradingName = companyMock1.tradingName;
    company.cnpj = companyMock1.cnpj;
    company.address = companyMock1.address;
    company.chosenBenefits = companyMock1.chosenBenefits;
    company.employees = [];
    company.save(function (error) {
      expect(
        (error as mongoose.Error.ValidationError).errors["name"]
      ).not.toBeUndefined;
    });
  });
});
