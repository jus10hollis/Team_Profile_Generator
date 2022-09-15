class Employee {
  constructor(role, name, id, email) {
    this.role = role;
    this.name = name;
    this.id = id;
    this.email = email;
  }
}

Employee.prototype.getRole = function () {
    new Promise ((resolve, reject) => {
 // Every team has a manager. 
 // IF the user confirms (Y) that they want to add an intern or engineer
 // THEN the user selects 'Engineer' prompt user to enter the engineer's name, ID, email, and 
 /// GitHub username; then take user back to the menu
  // IF the user confirms (Y) that they want to add an intern or engineer
  // THEN the user selects 'Intern' prompt user to enter the intern's name, ID, email, and 
  // school; then take user back to the menu        
    })
}

module.exports = Employee;
