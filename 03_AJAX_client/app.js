import { AJAX} from "./api/kingchi.js";
import {log, _} from '../my-module/logger.js';
const serverUrl = 'http://127.0.0.1:5000/api';



window.addEventListener('DOMContentLoaded', () => {
	fetchAllEmp();
});

const add_form = _('#add-employee-form')
add_form.addEventListener('submit', e => {
	e.preventDefault();
	// try {addedEmployee();} catch(e) {log(e);}
	addedEmployee()
	$('#add-employee-modal').modal('hide');
});

const tableBody = _('#table-body')
tableBody.addEventListener('click', (e) => {
	let targetElement = e.target;
	if (targetElement.classList.contains('delete')) {
		deleteEmployee(targetElement);
	};
	if (targetElement.classList.contains('update')) {
	try {updateEmployee(targetElement);} catch(e) {log(e);}
	};
});

const updateEmployeeForm = _('#update-employee-form');
updateEmployeeForm.addEventListener('submit', e => {
	e.preventDefault();
	updatedEmployeeData();
	$('#update-employee-modal').modal('hide');
})



const clearFormFields = () => {
	_('#add-fname').value = '';
	_('#add-lname').value = '';
	_('#add-email').value = '';
	_('#add-gender').value = '';
	_('#add-ip').value = '';
}



function fetchAllEmp () {
	let http = new AJAX();
	let url = `${serverUrl}/employees`;
	http.get(url, (err, employees) => {
		if (err) throw err;
		let empRow = '';
		for(let employee of employees) {
			empRow += `
				<tr>
					<td>${employee.id}</td>
					<td>${employee.first_name}</td>
					<td>${employee.last_name}</td>
					<td>${employee.email}</td>
					<td>${employee.gender}</td>
					<td>${employee.ip_address}</td>
					<td>
						<button class="btn btn-info update btn-sm rounded-0 mt-0">UPDATE</button>
						<button class="btn btn-danger delete btn-sm rounded-0 mt-0">DELETE</button>
					</td>
				</tr>
			`;
		};
		_('#table-body').innerHTML = empRow;
	});
};



function addedEmployee(e) {
	let employee = {
		first_name: _('#add-fname').value,
		last_name: _('#add-lname').value,
		email: _('#add-email').value,
		gender: _('#add-gender').value,
		ip_address: _('#add-ip').value
	}
	Object.keys(employee).forEach(key => {
		if (employee[key] === '') {
			throw new Error('All inputs are Required')
		}
	})

	let url = `${serverUrl}/employees`;
	let http = new AJAX();
	http.post(url, employee, res => {
		log(res.message);
		fetchAllEmp();
		clearFormFields();
	});
	};



//Delete request
const deleteEmployee = targetElement => {
	let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
	let url = `${serverUrl}/employees/${selectedId}`;
	let http = new AJAX();
	http.delete(url, res => {
		log(res.message);
		fetchAllEmp();
	});
};


//Update Reqest
const updateEmployee = targetElement => {
	let selectedId = targetElement.parentElement.parentElement.firstElementChild.innerHTML;
	let http = new AJAX();
	let url = `${serverUrl}/employees/`;
	http.get(url, (err, employees) => {
		if (err) throw err;
		let selectedEmp = employees.find(employee => employee.id === selectedId.trim());
		fillUpdateModal(selectedEmp)
	});

};


const fillUpdateModal = selectedEmp => {
	_('#update-id').value = selectedEmp.id;
	_('#update-fname').value = selectedEmp.first_name;
	_('#update-lname').value = selectedEmp.last_name;
	_('#update-email').value = selectedEmp.email;
	_('#update-gender').value = selectedEmp.gender;
	_('#update-ip').value = selectedEmp.ip_address;
	$('#update-employee-modal').modal('show');
}


//Update form submition
const updatedEmployeeData = () => {
	let employee = {
		first_name: _('#update-fname').value,
		last_name: _('#update-lname').value,
		email: _('#update-email').value,
		gender: _('#update-gender').value,
		ip_address: _('#update-ip').value
	}
	Object.keys(employee).forEach(key => {
		if (employee[key] === '') {
			throw new Error('All inputs are Required')
		}
	})
	let employeeid = _('#update-id').value;
	let url = `${serverUrl}/employees/${employeeid}`;
	let http = new AJAX();
	http.put(url, employee, res => {
		log(res.message);
		fetchAllEmp();
	});
};
