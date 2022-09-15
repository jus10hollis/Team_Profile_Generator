const Employee = require('./Employee')

// Should this be somethine like:
// class Engineer = new Employee

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
    }
}

module.exports = Engineer;