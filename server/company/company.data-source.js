import { DataSource } from "apollo-datasource";

export class CompaniesAPI extends DataSource {
  constructor(companyModel) {
    super();
    this.model = companyModel;
  }

  async getAllCompanies() {
    return this.model.find();
  }

  async findById(id) {
    return this.model.findById(id);
  }

  async createCompany(args) {
    return this.model.create(args);
  }
}
