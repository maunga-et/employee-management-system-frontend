import LeaveRequestsService from "../services/leave-requests.service";

export const countLeaveRequests = async (token) => {
	try {
		const response = await LeaveRequestsService.countUnreviewedLeaveRequests(token);
		return response.data.count;
	} catch (e) {
		return -1;
	}
}

export const listLeaveRequests = async (token) => {
	try {
		const response = await LeaveRequestsService.list(token);
		return response.data.results;
	} catch (e) {
		return -1;
	}
}


export const getLeaveRequest = async (token, id) => {
	try {
		const response = await LeaveRequestsService.get(token, id);
		return response.data;
	} catch (e) {
		return -1;
	}
}

export const updateLeaveRequest = async (token, id, data) => {
	try {
		const response = await LeaveRequestsService.update(token, id, data);
		return response.status;
	} catch (e) {
		return -1;
	}
}

export const listLeaveRequestsByEmployeeId = async (token, id) => {
	try {
		const response = await LeaveRequestsService.listByEmployeeId(token, id);
		return response.data;
	} catch (e) {
		return -1;
	}
}

export const createLeaveRequest = async (token, data) => {
	try {
		const response = await LeaveRequestsService.create(token, data);
		return response.status;
	} catch (e) {
		return -1;
	}
}


export const listLeaveRequestsBySupervisorId = async (token, id) => {
	try {
		const response = await LeaveRequestsService.listBySupervisorId(token, id);
		return response.data;
	} catch (e) {
		return -1;
	}
}
