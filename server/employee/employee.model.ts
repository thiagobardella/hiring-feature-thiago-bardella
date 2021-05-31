import mongoose, { Document, Schema } from "mongoose";
import { ICompany } from "../company/company.model.js";
import { Benefits } from "../constants";

export interface IEmployee extends Document {
  id?: string;
  name: string;
  cpf: string;
  address: string;
  phone: string;
  chosenBenefits: string[];
  companies: ICompany[];
}

export interface Employee extends IEmployee {
  id: string;
}

export const EmployeeSchema = new Schema<IEmployee>({
  name: {
    type: String,
    required: [true, "Nome do colaborador é obrigatório"],
  },
  cpf: {
    type: String,
    unique: true,
    required: [true, "CPF é obrigatório"],
    match: [
      /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2}/,
      "CPF deve possuir 11 dígitos",
    ],
  },
  address: {
    type: String,
    required: [true, "Endereço é obrigatório"],
    maxlength: [100, "Endereço deve possuir no máximo 100 caracteres"],
  },
  phone: {
    type: String,
    required: [true, "Telefone é obrigatório"],
    match: [
      /^\([0-9]{2}\)\s[0-9]{5}\s[0-9]{3,4}/,
      "Telefone deve estar no formato DDD + número",
    ],
  },
  chosenBenefits: [{ type: String, enum: Benefits }],
  companies: { type: Array },
});

EmployeeSchema.post("save", function (error: any, _doc: any, next: any) {
  if (error.name === "MongoError" && error.code === 11000) {
    // next(new Error(`${Object.keys(error.keyValue)[0]} já cadastrado`));
    next(new Error(`CPF já cadastrado`));
  } else {
    next();
  }
});

export default mongoose?.models.employees ||
  mongoose?.model<IEmployee>("employees", EmployeeSchema);
