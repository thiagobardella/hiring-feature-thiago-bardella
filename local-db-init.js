const companiesFixtures = [
  {
    chosenBenefits: ["vr", "vt"],
    name: "International Business Machines Corporation",
    tradingName: "IBM",
    cnpj: "33.372.251/0126-77",
    address: "Rua Tutoia, 1157",
  },
  {
    chosenBenefits: ["vr", "vt", "gymPass"],
    name: "Flash App Flash Tecnologia e Pagamentos Ltda.",
    tradingName: "Flash App",
    cnpj: "32.223.020/0001-18",
    address: "Eugenio de Medeiros, 242",
  },
];
db.companies.drop();
db.companies.insertMany(companiesFixtures);
