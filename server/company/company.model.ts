import mongoose, { Document, Schema } from "mongoose";
import { Benefits } from "../constants";
import { IEmployee } from "../employee/employee.model";

export interface ICompany extends Document {
  id?: string;
  name: string;
  tradingName: string;
  cnpj: string;
  address: string;
  chosenBenefits: string[];
  employees: IEmployee[];
}

export const CompanySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: [true, "Nome da empresa é obrigatório"],
    maxlength: [100, "Nome deve possuir no máximo 100 caracteres"],
  },
  tradingName: {
    type: String,
    required: [true, "Nome fantasia é obrigatório"],
    maxlength: [100, "Nome fantasia deve possuir no máximo 100 caracteres"],
  },
  cnpj: {
    type: String,
    unique: true,
    required: [true, "CNPJ é obrigatório"],
    match: [/^[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}/, "CNPJ deve possuir 14 dígitos"],
  },
  address: {
    type: String,
    required: [true, "Endereço é obrigatório"],
    maxlength: [100, "Endereço deve possuir no máximo 100 caracteres"],
  },
  chosenBenefits: [
    { type: String, enum: Benefits } 
  ],
  employees: {
    type: Array,
  }
});

CompanySchema.post('save', function(error: any, _doc: any, next: any) {
  if (error.name === 'MongoError' && error.code === 11000) {
    // next(new Error(`${Object.keys(error.keyValue)[0]} já cadastrado`));
    next(new Error(`CNPJ já cadastrado`));
  } else {
    next();
  }
});

export default mongoose?.models.companies ||
  mongoose?.model<ICompany>("companies", CompanySchema);
