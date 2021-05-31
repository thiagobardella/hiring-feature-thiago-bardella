import { DataSource } from "apollo-datasource";
import DataLoader from "dataloader";
import { Model } from "mongoose";
import { IEmployee } from "./employee.model";

export class EmployeesAPI extends DataSource {
  private employeeModel: Model<IEmployee>;

  constructor(employeeModel: Model<IEmployee>) {
    super();
    this.employeeModel = employeeModel;
  }

  private employeesLoader = new DataLoader(async (keys) => {
    const employeesList = await this.employeeModel.find();
    return keys.map((id) =>
      employeesList.find((employee) => employee.id === id)
    );
  });
  
  async getAllEmployees() {
    return this.employeeModel.find();
  }

  async getEmployees(ids: string[]) {
    return this.employeesLoader.loadMany(ids);
  }

  async findById(id: string) {
    return this.employeesLoader.load(id);
  }

  async createEmployee(args: IEmployee) {
    const employee = this.employeeModel.create(args);
    this.employeesLoader.clearAll();
    return employee;
  }
}
