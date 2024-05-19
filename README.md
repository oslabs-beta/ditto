# ditto

# TypeScript

- double config file reasoning. Normally you would have a folder for all typescript and a separate folder for your compiled ts files that are converted to js. However since we are working on backend and front end
  in a single repo, we need to separate the two. The double config files allow us to target
- strict: true - enables all possible strict type-checking options such as strictNullChecks, strictFunctionTypes and more. it's purpose is to catch posible errors early.
  ex.
  class User {
  id: number;
  name: string;
  email?: string; // Optional property

        constructor(id: number, name: string, email?: string) {
            this.id = id;
            this.name = name;
            this.email = email;
        }

        greet() {
            console.log(`Hello, my name is ${this.name} and my email is ${this.email.toUpperCase()}`);
        }

  }

  if no email was specified yet we attached a method to the function greet that targets email, we could run into errors. Therefore would have to refactor to below:
  greet() {
  if (this.email) {
  console.log(`Hello, my name is ${this.name} and my email is ${this.email.toUpperCase()}`);
  } else {
  console.log(`Hello, my name is ${this.name} and I do not have an email`);
  }
  }

# Webpack

- proxy: allows us to not have write the whole localhost: 3000
- fileloader: helps server static files but also renames our file when running webpack making it not possible for the component to find the file

# Tests

- https://www.youtube.com/watch?v=4-_0aTlkqK0
- unit tests: generally test a single thing like a function
- integration tests: tests smaller portion of code, acts like a user interacting with site. ex) function that calls to api and saves to database.
- end to end: whole application, generally emulates users clicking buttons and emulates the browser. treat it like user is using your site.
- Q. why do we write tests if we already have edge cases to catch possible errors?
- A. one reason is we need to make sure those edge cases actually work, so we could create a test for them.
- Q. why would we not just use the browser for ex, test that a link works in our nav bar?
- A. it is effective initially for basic functions but as project grows it can have issues
  1. effiency, automated tests are fasted
  2. regression, new feautures can mess up previous code functions
  3. consisteency: manual testing prone to error
  4. edge cases: you won't have to write or do the edgecases, cause automated test will already do it for you
  5. scalability

# ESM vs CJS

- Q. what's the difference?

# TroubleShoot"

- if you're getting react error messages, try uninstalling and re-installing npm.

# Tracking Connection String

- in the state

# POSTMAN

- Registration
  POST
  URL: /auth/register
  Body: { "username": "boo", "password": "hoo123" }
  Response: id, username, created_at

- Login
  POST
  URL: /auth/login
  Body: { "username": "boo", "password": "hoo123" }
  Response: 200ok and a jwt token

- Add DB Connect String
  POST
  URL: /db/addConnectionString
  Header: Authorization Bearer <login jwt token>
  Body: { "db_name": "mydatabase", "connection_string": "postgresql://username:password@host:port/database"}
  Response: status 201 created, db_id, name, string, date

- Get DB String for User
  GET
  URL: /db/connectionStrings
  Headers: Auth Bearer <jwt token>
  Response: 200 ok, db_id, name, string, created_at

- Execute Migration
  POST
  URL: /migration
  Hedaers: Auth Bearer <jwt>
  Body: {
  "script": "CREATE TABLE test_table (id SERIAL PRIMARY KEY, name VARCHAR(100));",
  "dbId": 1
  }
  Response: 201 created

# Q. Why is there a getConnectionStringById and getConnectionString?

# A. The latter shows all the databases, and the second one is the specific database for the user.

# MigraitonLog

- contains the script

# AuditLog

- the user who added script
