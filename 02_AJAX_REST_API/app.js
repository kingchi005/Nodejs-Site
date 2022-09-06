import { AJAX } from "./api/kingchi.js";
const serverUrl = 'http://127.0.0.1:5000/api';


let getBtn = document.querySelector('#get-btn');
let postBtn = document.querySelector('#post-btn');
let putBtn = document.querySelector('#put-btn');
let delBtn = document.querySelector('#del-btn');
getBtn.addEventListener('click', () => {
	fetchEmployees();
})
postBtn.addEventListener('click', () => {
	creatEmployees();
})
putBtn.addEventListener('click', () => {
	updateEmployees();
})
delBtn.addEventListener('click', () => {
	deleteEmployees();
})

let fetchEmployees = () => {
	let http = new AJAX();
	let url = `${serverUrl}/employees`;
	http.get(url, (err, employees) => {
		if (err) {
			throw err;
			return;
		}
		let tr = '';
		for(let employee of employees){
			tr += `
			<tr>
				<td>${employee.id}</td>
				<td>${employee.first_name}</td>
				<td>${employee.last_name}</td>
				<td>${employee.email}</td>
				<td>${employee.gender}</td>
				<td>${employee.ip_address}</td>
			</tr>
			`;
		}
		document.querySelector('#table-body').innerHTML = tr;
		// console.log(data)
	});

}
let creatEmployees = () => {
	let url = `${serverUrl}/employees`;
	let employee = {
		first_name : 'Rajan',
		last_name : 'Jain',
		email : 'Rajan@gmail.com',
		gender : 'Male',
		ip_address : '121.2.3.234'
	}

	let http = new AJAX();
	http.post(url, employee, data => {
		console.log(data);
		fetchEmployees();
	});
}

let updateEmployees = () => {
	let empID = '242f23';
	let employee = {
		id : empID,
		first_name : 'Michel',
		last_name : 'Gail',
		email : 'gail@gmail.com',
		gender : 'Male',
		ip_address : '121.2.3.234'
	};
	let url = `${serverUrl}/employees/${empID}`;
	let http = new AJAX();
	http.put(url, employee, data => {
		console.log(data);
		fetchEmployees();
	});
};


let deleteEmployees = () => {
	let empID = 'w3233e';
	let url = `${serverUrl}/employees/${empID}`;
	let http = new AJAX();
	http.delete(url, data => {
		console.log(data);
		fetchEmployees();
	});
}