const express = require("express");
const importData = require("./data");
const Joi = require("joi");

const app = express();
const router = express.Router();

let port = process.env.port || 8080;
const maxSeconds = 10;
let counter = 0;


function ResetCounter() {
    counter++;
    console.log(counter);
    if (counter >= maxSeconds) {
        console.log("Done");
        counter = 0;
    }
}

setInterval(() => {
    ResetCounter();
}, 1000);


app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World! This is a simple Node API Application");
})

app.get("/data", (req, res) => {
    res.send(importData);
})
app.get("/data/employees", (req, res) => {
    const employees = importData.employees;
    res.send(employees);
})
app.get("/data/employees/:id", (req, res) => {
    const employee = importData.employees.find(c => c.id === req.params.id);
    if (!employee) {
        res.status(404).send("Employee id doesnt exist");
    }
    res.send(employee);
})

app.get("/data/employees/:id/:info", (req, res) => {
    const employee = importData.employees.find(c => c.id === req.params.id);
    if (!employee) {
        res.status(404).send("Employee id doesnt exist");
    }
    switch (req.params.info) {
        case "salary":
            res.send(employee.salary);
            break;
        case "name":
            res.send(employee.name);
            break;
        default:
            res.status(400).send("Insert parameter correctly after ID");
    }
})

app.post("/data/employees", (req, res) => {
    const employees = importData.employees;
    const newEmployee = {
        id: employees.length + 1,
        name: req.body.name,
        surname: req.body.surname,
        status: req.body.status,
        salary: req.body.salary,
        position: req.body.position
    }
    employees.push(newEmployee);
    res.send(newEmployee);
})

app.put("/data/employees/:id", (req, res) => {
    const employee = importData.employees.find(c => c.id === req.params.id);
    if (!employee) {
        res.status(404).send("Employee id doesnt exist");
    }

    employee.name = req.body.name;
    employee.surname = req.body.surname;
    employee.status = req.body.status;
    employee.salary = req.body.salary;
    employee.position = req.body.position;
    res.send(employee);
})

app.delete("/data/employees/:id", (req, res) => {
    const employee = importData.employees.find(c => c.id === req.params.id);
    if (!employee) {
        res.status(404).send("Employee id doesnt exist");
    }

    const index = importData.employees.indexOf(employee);
    importData.employees.splice(index, 1);
    res.send(employee);
})

app.listen(port, () => {
    console.log(`Hello, you are on port number ${port}`);
});