## Getting Started

Install node, yarn, docker and docker-compose.

Run docker-compose:

```shell
docker-compose up
```

It will run a local mongodb on port 27017 and populate the collection 'companies' on the database 'flash'

Use your favorite GUI client to check it out, like Robo3T, NoSQLBooster or MongoDB Compass.

Install the dependencies and run the server:

```shell
yarn
yarn server
```

The server will start on `http://localhost:3000`

Open another terminal and run the client:

```shell
yarn client
```

The client will start on `http://localhost:1234`

## BUGS

- Main "app" div without id - client/index.html - line 8
- app.jsx without React import - client/app.jsx - line 1
- Wrong server port at .env - .env - line 2
- Wrong Fetch Policy for companies - client/pages/companies/companies.page.jsx - line 47
- (typo) Wrong Button prop method onClick - client/pages/companies/companies.page.jsx - line 75
- Wrong CNPJ REGEX validator - server/company/company.model.js - line 17
- Invalid value "gymPass" at chosenBenefits - local-db-init.js - line 10
- Query GetAllCompanies retrieving non-declared employees list - client/graphql/queries.js - line 12
