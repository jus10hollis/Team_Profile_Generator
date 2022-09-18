class Employee {
  constructor(role, name, id, email) {
    this.role = role;
    this.name = name;
    this.id = id;
    this.email = email;
  }
getRole() {
  console.log(this.role)
}


}


module.exports = Employee;
