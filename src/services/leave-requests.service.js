import axiosInstance from '../utils/http-common'

class LeaveRequestsService {
	create(token, data) {
		return axiosInstance.post('leave-requests/', data, {headers: {'Authorization': `Bearer ${token}`}})
	}

	update(token, id, data) {
		console.log(token)
		return axiosInstance.patch(`leave-requests/${id}/update/`, data, {headers: {'Authorization': `Bearer ${token}`}})
	}

	delete(token, id) {
		return axiosInstance.delete(`leave-requests/${id}/delete/`, {headers: {'Authorization': `Bearer ${token}`}})
	}

	get(token, id) {
		return axiosInstance.get(`leave-requests/${id}/`, {headers: {Authorization: `Bearer ${token}`}})
	}

	list(token) {
		return axiosInstance.get('leave-requests/list/', {headers: {Authorization: `Bearer ${token}`}})
	}

	listByEmployeeId(token, id) {
		return axiosInstance.get(`leave-requests/list/${id}/`, {headers: {Authorization: `Bearer ${token}`}})
	}

	listBySupervisorId(token, id) {
		return axiosInstance.get(
			`leave-requests/list-by-supervisor-id/${id}/`,
			{headers: {Authorization: `Bearer ${token}`}}
		)
	}

	countUnreviewedLeaveRequests(token) {
		return axiosInstance.get(
			'leave-requests/count/pending/',
			{headers: {Authorization: `Bearer ${token}`}}
		)
	}
}

export default new LeaveRequestsService();
