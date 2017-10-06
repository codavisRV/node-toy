const fs = require('fs');

var list = fs.readFileSync('employees.json');
list = JSON.parse(list);
var nextId = list[list.length-1]._id + 1;

var getByID = (id) => {
    filteredList = list.filter((employee) => employee._id === id);
    filteredItem = filteredList[0];
    return filteredItem;
};

var getAllEmployees = () => {
    return new Promise((resolve, reject) => {
        if (list.length === 0) {
            reject("No employees to retrieve");
        } 
        resolve(list);
    });
};

var getSelectEmployee = (id) => {
    var foundEmployee = getByID(id);
    return new Promise((resolve, reject) => {
        if (!foundEmployee) {
            reject("Employee not found.");
        } 
        resolve(foundEmployee);
    });
};

var addEmployee = (employee) => {
    return new Promise((resolve, reject) => {
        if (employee.name === "" || employee.salary === "" || employee.department === "") {
            reject('Please enter name, salary and department.');
        }
        employee._id = nextId;
        nextId ++;
        list.push(employee);
        updatedList = JSON.stringify(list);
        fs.writeFileSync('employees.json', updatedList);
        resolve('Employee added');
    })
};

var updateEmployee = (content, id) => {
    return new Promise((resolve, reject) => {
        var foundEmployee = getByID(id);
        if (!foundEmployee) {
            reject('Employee not found.');
        }
        foundEmployee.name = content.name || foundEmployee.name;
        foundEmployee.department = content.department || foundEmployee.department;
        foundEmployee.salary = content.salary || foundEmployee.salary;
        updatedList = JSON.stringify(list);
        fs.writeFileSync('employees.json', updatedList);
        resolve(`Employee ${foundEmployee.name} updated`);
    })
};

var deleteEmployee = (id) => {
    return new Promise((resolve, reject) => {
        shortenedList = list.filter((employee) => employee._id !== id);
        if (shortenedList.length === list.length) {
            reject('Employee not found.');
        }
        shortenedList = JSON.stringify(shortenedList);
        fs.writeFileSync('employees.json', shortenedList);
        resolve(`Employee deleted`);
    });
};
module.exports = {
    getAllEmployees, 
    getSelectEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
}