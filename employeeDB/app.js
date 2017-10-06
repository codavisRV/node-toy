// MEDIUM: Create an express API that will have 10 employees in it, their employeeID, their name, their salary and department name. When you hit the endpoint with a GET request we want the api to respond with all data on the employees. If you hit the endpoint with their employeeID, we want to hand up only the information on that one employee. If you hit the endpoint with an incorrect employeeID, send back the correct HTTP status code and an error message stating that the employee was not found.
// GET::myendpointname.com/employees = Json with information from all 10 employees.
// GET::myendpointname.com/employees/<employeeID> = Json with the information from that specific employee.
const express = require('express');
const bodyParser = require('body-parser')

const functions = require('./functions');
const getAllEmployees = functions.getAllEmployees;
const getSelectEmployee = functions.getSelectEmployee;
const addEmployee = functions.addEmployee;
const updateEmployee = functions.updateEmployee;
const deleteEmployee = functions.deleteEmployee;



// launch express app
const app = express();
app.use(bodyParser.json());


//define some express GET/POST methods
app.get('/employees', (req, res) => {
    getAllEmployees().then((employees) => {
        res.send(employees);
    }, (e) => {
        res.status(404).send(e);
    });
});

app.get(`/employees/:id`, (req, res) => {
    var id = req.params.id;
    getSelectEmployee(parseInt(id)).then((employee) => {
        res.send(employee);
    }, (e) => {
        res.status(404).send(e);
    }
)    
});




// HARD: Add the remaining CRUD functionality to your medium problem. Make sure you return the proper HTTP status codes based on the outcome of the request. Be sure to implement error checking here. If an invalid request is made, we want to return some sort of error message and the correct HTTP status code for the situation.
// HTTP Status Codes: http://www.restapitutorial.com/httpstatuscodes.html

// POST::myendpointname.com/employees  =  Inserts new employee into your data.
// GET::myendpointname.com/employees = Returns json with information from all employees.
// GET::myendpointname.com/employees/<employeeID>  =  Returns json with the information from that specific employee.
// PUT::myendpointname.com/employees/<employeeID>  =  Updates information for specified employee.
// DELETE::myendpointname.com/employees/<employeeID>  =  Removes the employee with that ID from the data.

app.post('/employees', (req, res) => {
    addEmployee(req.body).then((message) => {
        res.send(message)
    }, (e) => {
        res.status(400).send(e);
    });
    }
);

app.post('/employees/:id', (req, res) => {
    var id = req.params.id;
    updateEmployee(req.body, parseInt(id)).then((message) => {
        res.send(message);
    }, (e) => {
        res.status(404).send(e);
    });
});

app.delete('/employees/:id', (req, res) => {
    var id = req.params.id;
    deleteEmployee(parseInt(id)).then((message) => {
        res.send(message);
    }, (e) => {
        res.status(404).send(e);
    });
});


//tell the app to listen
app.listen(3000, () => {
    console.log('Server started on Port 3000...');
})