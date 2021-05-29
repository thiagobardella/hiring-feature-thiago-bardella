import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
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
    required: [true, "CNPJ é obrigatório"],
    match: [/$[0-9]{12}/, "CNPJ deve possuir apenas números e 14 caracteres"],
  },
  address: {
    type: String,
    required: [true, "Endereço é obrigatório"],
    maxlength: [100, "Endereço deve possuir no máximo 100 caracteres"],
  },
  chosenBenefits: {
    type: Array,
  },
});

export default mongoose.models.companies ||
  mongoose.model("companies", CompanySchema);
