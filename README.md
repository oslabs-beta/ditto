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
