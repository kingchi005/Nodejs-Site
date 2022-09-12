const fs = require('fs');
const log = require('../logger')
const express = require('express');
const router = express.Router();

//GET - Employee
/*let emp = `
[
  {
    "id": "w3233e",
    "first_name": "John",
    "last_name": "Bull",
    "email": "john@gmail.com",
    "gender": "Male",
    "ip_address": "127.4.3.1"
  },
  {
    "id": "242whg3",
    "first_name": "Kelly",
    "last_name": "Chealsy",
    "email": "kellychi@gmail.com",
    "gender": "Male",
    "ip_address": "234..437.5.3.1"
  },
  {
    "id": "3bhf23",
    "first_name": "Ruth",
    "last_name": "Rosemy",
    "email": "rosemyr@gmail.com",
    "gender": "Female",
    "ip_address": "1.2.327.5.3.1"
  },
  {
    "id": "2872hy3",
    "first_name": "Mark",
    "last_name": "Jude",
    "email": "markj@gmail.com",
    "gender": "Male",
    "ip_address": "127.5.3.1"
  },
  {
    "id": "sd23sd",
    "first_name": "Mary",
    "last_name": "Chidimma",
    "email": "machi@gmail.com",
    "gender": "Female",
    "ip_address": "132.5.3.8.1"
  }
]`;
*/

let raw = fs.readFileSync('../employees.json');
let employees = JSON.parse(raw);


// let db = JSON.stringify(emp,null,2);
// fs.writeFile('../employees.json', db, cb);
// function cb() {
// 	log('db reset');
// }


/*
let proto = fs.readFileSync('C:/Users/king/Downloads/users.json');
let readData = JSON.parse(proto);
log(JSON.stringify(readData, null, 2))*/
// log(employees);
/*let employee = {
	id: 'sd3sd',
	first_name: 'Mary',
	last_name: 'Chimma',
	email: 'machi@gmail.com',
	gender: 'F',
	ip_address: '132.5.3.8.1'
}
employees.push(employee)
log(employees)
*/

//Get ID
let getID = () => `${Math.random().toString(36).substr(6,6)}`;

//GET - Employee
router.get('/employees/', (req,res) => {
	// res.json();
	res.json(employees);
	log(`GET Request Received at server ... ${new Date().toLocaleTimeString()}`);
})

//Get byId
router.get('/employees/:id',(req,res) => {
	if (req.params.id) {
		let empid = req.params.id;
		let Employee = employees.find(c => c.id === empid);
		if (!Employee) {
			res.status(400).json({message : `Employee with the ID '${empid}' was not found`})
			return;
		}
		log(`QUERY Request Received at server ... ${new Date().toLocaleTimeString()}`)
		res.json(Employee)
	}

})

//POST - Employee
router.post('/employees',(req,res) => {
	let employee = {
		id: getID(),
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		gender : req.body.gender,
		ip_address: req.body.ip_address
	}
	employees.push(employee);
	// log(employees)
	let raw = JSON.stringify(employees, null, 2);
	fs.writeFile('../employees.json', raw, cb);
	function cb() {
		log('file written');
	}
	log(`POST Request Received at server ... ${new Date().toLocaleTimeString()}`)
	res.json({message : 'POST Request Successful',added_employee:employee}, null, 2)
});


//PUT Request
router.put('/employees/:id', (req,res) => {
	let empid = req.params.id;
	let extEmployee = employees.find(c => c.id === empid);
	if (!extEmployee) {
		res.status(400).json({message : `Employee with the ID '${empid}' was not found`})
		return;
	}
	let updatedEmployee = {
		id: extEmployee.id,
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		email : req.body.email,
		gender : req.body.gender,
		ip_address: req.body.ip_address
	};
	employees.splice(employees.indexOf(extEmployee),1,updatedEmployee);
	let raw = JSON.stringify(employees, null, 2);
	fs.writeFile('../employees.json', raw, cb);
	function cb() {
		log('file written');
	}
	log(`PUT Request Received at server ... ${new Date().toLocaleTimeString()}`)
	res.json({message : 'PUT Request Successful',current_employee: { updatedEmployee, formalEmployee: extEmployee }})
	// log(empid)
});



//DELETE Request
router.delete('/employees/:id', (req,res) => {
	let empid = req.params.id;
	let delEmployee = employees.filter(employee => employee.id === empid);
	employees = employees.filter(employee => employee.id !== empid);
	if (delEmployee.length === 0) {
		res.status(400).json({message : `Employee with the ID '${empid}' was not found`})
		return
	}
	let raw = JSON.stringify(employees, null, 2);
	fs.writeFile('../employees.json', raw, cb);
	function cb() {
		log('file written');
	}
	log(`DELETE Request Received at server ... ${new Date().toLocaleTimeString()}`)
	res.json({message : 'DELETE Request Successful',deleted_employee: delEmployee[0]})
})



module.exports = router;