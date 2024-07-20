import axiosInstance from '../utils/http-common'

class EmployeesService {
	create(token, data) {
		return axiosInstance.post('employees/', data, {headers: {Authorization: `Bearer ${token}`}})
	}

	list(token) {
		return axiosInstance.get('employees/list/', {headers: {Authorization: `Bearer ${token}`}})
	}

	count(token) {
		return axiosInstance.get('employees/count/', {headers: {Authorization: `Bearer ${token}`}})
	}

	countSubordinates(token, id) {
		return axiosInstance.get(`employees/count-by-supervisor/${id}/`, {headers: {Authorization: `Bearer ${token}`}})
	}

	get(token, id) {
		return axiosInstance.get(`employees/${id}/`, {headers: {Authorization: `Bearer ${token}`}})
	}

	retrieveEmployeesUnderSupervisor(token, id) {
		return axiosInstance.get(
			`employees/employees-under-a-supervisor/${id}/`,
			{headers: {Authorization: `Bearer ${token}`}}
		)
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new EmployeesService();
