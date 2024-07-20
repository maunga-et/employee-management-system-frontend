import axiosInstance from '../../src/utils/http-common';
import { jwtDecode } from "jwt-decode";

class AuthenticationService {
	login(data) {
		return axiosInstance.post('authentication/token/', data)
	}

	decodeAccessToken(token) {
		return jwtDecode(token);
	}

	getEmployeeRole(token) {
		const decodedToken = this.decodeAccessToken(token);
		return decodedToken?.role;
	}

	getEmployeeFullName(token) {
		const decodedToken = this.decodeAccessToken(token);
		return `${decodedToken?.first_name} ${decodedToken?.last_name}`;
	}

	getEmployeeNumber(token) {
		const decodedToken = this.decodeAccessToken(token);
		return decodedToken?.employee_number;
	}

	getEmployeeUserId(token) {
		const decodedToken = this.decodeAccessToken(token);
		return decodedToken?.user_id;
	}
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new AuthenticationService();
