const Employee = require("./Employee");

class Intern extends Employee {
  constructor(role, name, id, email, school) {
    super(role, name, id, email);
    this.school = school;
  }
}

module.exports = Intern;
