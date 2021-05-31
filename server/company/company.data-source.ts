import { DataSource } from "apollo-datasource";
import DataLoader from "dataloader";
import { Model, Schema } from "mongoose";
import { IEmployee } from "../employee/employee.model";
import { ICompany } from "./company.model";

export class CompaniesAPI extends DataSource {
  private companyModel: Model<ICompany>;

  constructor(companyModel: Model<ICompany>) {
    super();
    this.companyModel = companyModel;
  }

  async getAllCompanies() {
    return this.companyModel.find();
  }

  async findById(id: string) {
    return this.companyLoader.load(id);
  }

  async createCompany(args: ICompany) {
    const company = await this.companyModel.create(args);
    this.companyLoader.clearAll();
    return company;
  }

  private companyLoader = new DataLoader(async (keys) => {
    const companiesList = await this.companyModel.find();
    return keys.map(id =>
      companiesList.find((company) => company.id === id),
    );
  });

  async getCompanies(ids: string[]) {
    return this.companyLoader.loadMany(ids);
  }

  async addEmployees(companyId: string, employees: any) {
    const company = await this.findById(companyId);
    if (company && employees) {
      company.employees = [...company.employees, ...employees];
      const result = await company.save();
      this.companyLoader.clearAll();
      return result;
    }
  }
}
