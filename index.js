const fs = require("fs");
const inquirer = require("inquirer");
const jest = require("jest");
const Employee = require("./Employee");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
let team = [];

//prompts to enter the team manager’s name, employee ID, email address, and office number
// need an array of job titles/roles for the HTML ["Manager", "Intern", "Engineer"]
const questions = [
  {
    type: "input",
    message: "What is the team manager's name",
    name: "name",
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
    type: "checkbox",
    message: "Select which team members you would like to include.",
    name: "next",
    choices: ["Engineer", "Intern", "Finish"],
    when: (answer) => answer.members_choice === "Y",
  },
  {
    /// "Engineer" prompt user to enter the engineer's name, ID, email, and GitHub username; then take user back to the menu
    type: "input",
    message: "Engineer's GitHub:",
    name: "github",
    when: (answer) => answer.members === "Engineer",
  },
  {
    /// "Intern" prompt user to enter the intern's name, ID, email, and school; then take user back to the menu
    type: "input",
    message: "Intern's school:",
    name: "school",
    when: (answer) => answer.members === "Intern",
  },
  {},
];

inquirer.prompt(questions).then((response) => {
  if (response.next === "Engineer") {
    addEngineer(response);
  } else if (response.next === "Intern") {
    addIntern();
  } else {
    generatePage();
  }
});

function addEngineer(response) {
  const newEngineer = new Engineer({ name, email, id, github });
  team.push(newEngineer);
}

function addIntern(response) {
  const newIntern = new Intern({ name, email, id, school });
  team.push(newIntern);
}
//an HTMLinput file is generated that displays a nicely formatted team roster based on user input
// a foreach  and team.map() inside the template literals

function generatePage() {
  fs.writeFile(
    "team_roster.html",
    `<!DOCTYPE html>
    <html class="no-js" lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/css/bootstrap.min.css" integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu" crossorigin="anonymous">
      <title>My Team</title>
      
    </head>
    
    <body>
    <header class = "text-bg-danger">
        <h1>My Team</h1>
        </header>${team.map()}
    <div class = "card text-center">
      <div class = "card-header bg-primary">
        <h1></h1>
        <h1><i class="fa-solid fa-mug-hot fa-glasses fa-user-graduate"></i>${team.map()}</h1>
      </div>
      <ul class = "list-group list-group-flush align-items-center justify-content-center">
        <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${team.map()}</li>
        <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${team.map()}</li>
        <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${team.map()}</li>
        <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${team.map()}</li>
        <li class = "card g-col-2 shadow p-3 mb-5 bg-body rounded">${team.map()}</li>
      </ul>
    </div>
    <div class = "card-body">
        <a href="#" class = "card-link">${team.map()}</a>
        <a href="#" class = "card-link">${team.map()}</a>
      <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js" integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd" crossorigin="anonymous"></script> </body>
    </html>`,
    (err) =>
      err ? console.error(err) : console.log("The html has been created!")
  );
}

//an HTMLinput file is generated that displays a nicely formatted team roster based on user
