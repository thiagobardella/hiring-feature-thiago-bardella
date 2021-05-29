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
