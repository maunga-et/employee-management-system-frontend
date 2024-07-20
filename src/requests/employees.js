import EmployeesService from "../services/employees.service";

export const listEmployees = async (token) => {
	try {
		const response = await EmployeesService.list(token);
		return response.data;
	} catch (e) {
		return -1;
	}
}


export const countEmployees = async (token) => {
	try {
		const response = await EmployeesService.count(token);
		return response.data.count;
	} catch (e) {
		return -1;
	}
}

export const countSubordinates = async (token, id) => {
	try {
		const response = await EmployeesService.countSubordinates(token, id);
		return response.data.count;
	} catch (e) {
		return -1;
	}
}

export const addEmployee = async (token, data) => {
	try {
		const response = await EmployeesService.create(token, data);
		return response.status;
	} catch (e) {
		return -1;
	}
}

export const getEmployee = async (token, id) => {
	try {
		const response = await EmployeesService.get(token, id);
		return response.data;
	} catch (e) {
		return -1;
	}
}

export const employeesUnderSupervisor = async (token, id) => {
	try {
		const response = await EmployeesService.retrieveEmployeesUnderSupervisor(token, id);
		return response.data;
	} catch (e) {
		return -1;
	}
}

