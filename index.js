const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");
const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");

//prompts to enter the team manager’s name, employee ID, email address, and office number
// need an array of job titles/roles for the HTML ["Manager", "Intern", "Engineer"]
const questions = [
  {
    type: "input",
    message: "What is the employee's name",
    name: "name",
  },
  {
    type: "list",
    message: "What is the employee's role",
    name: "role",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    type: "input",
    message: "Employee ID:",
    name: "id",
  },
  {
    type: "input",
    message: "Email:",
    name: "email",
  },
  {
    type: "input",
    message: "Office number:",
    name: "officeNumber",
  },
  {
    type: "confirm",
    message: "Would you like to add team members?",
    name: "add",
  },
  {
    type: "checkbox",
    message: "Select which team members you would like to include.",
    name: "next",
    choices: ["Engineer", "Intern", "Finish"],
  },
  /// "Engineer" prompt user to enter the engineer's name, ID, email, and GitHub username; then take user back to the menu
  {
    type: "input",
    message: "Engineer's GitHub:",
    name: "github",
  },
  {
    /// "Intern" prompt user to enter the intern's name, ID, email, and school; then take user back to the menu
    type: "input",
    message: "Intern's school:",
    name: "school",
  },
];
let team = [];

function init() {
  inquirer.prompt(questions).then((response) => {
    function addEngineer(response) {
      const newEngineer = new Engineer(
        response.name,
        response.email,
        response.id,
        response.github
      );
      team.push(newEngineer);
      init();
    }

    function addIntern(response) {
      const newIntern = new Intern(
        response.name,
        response.email,
        response.id,
        response.school
      );
      team.push(newIntern);
      init();
    }
    if (response.add !== "y") {
      return generatePage();
    } else if (response.next === "Engineer") {
      addEngineer(response);
    } else if (response.next === "Intern") {
      addIntern();
    } else {
      generatePage();
    }
  });
  function generatePage(response) {
    fs.writeFile(
      "team_roster.html",
      `<!DOCTYPE html>
      <html class="no-js" lang="en">
      
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/>
        <title>My Team</title>
        
      </head>
      
      <body class="container-fluid align-items-center text-center">
      <header class = "jumbotron bg-danger text-white">
          <h1>My Team</h1>
      </header>
      <main class = "col">
        <section class ="row">
          <div class = "card w-25 border border-dark rounded">
              <div class = "card-body">
                  <div class = "card-header">
                        <h1><i class="fa-solid fa-mug-hot fa-glasses fa-user-graduate">${response.name}</i></br>${response.role}</h1>
                  </div>
                <ul class = "list-group list-group-flush align-items-center justify-content-center">
                  <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${response.email}</li>
                  <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${response.id}</li>
                  <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${response.github}</li>
                  <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${response.school}</li>
                  <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${response.officeNumber}</li>
                </ul>
              </div>
              <div class = "card-body">
                  <a href="#" class = "card-link">${response.email}</a>
                  <a href="#" class = "card-link">${response.github}</a>
              </div>
          </div>
            </section>
            </main>
          </body>
        <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script> </body>
      </html>`,
      (err) =>
        err ? console.error(err) : console.log("The html has been created!")
    );
  }
}

//an HTMLinput file is generated that displays a nicely formatted team roster based on user input
// a foreach  and team.map() inside the template literals

init();

module.exports = jest;
//an HTMLinput file is generated that displays a nicely formatted team roster based on user
