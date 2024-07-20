import AuthenticationService from "../services/authentication.service";

export const login = async (data) => {
	const responseFormat = (status, data) => {
		return {status, data}
	}

	try {
		const response = await AuthenticationService.login(data);
		return responseFormat('success', response.data);
	} catch (e) {
		if (e.code === 'ERR_NETWORK') {
			return responseFormat(
				'networkError',
				'An error occurred. Please check your network connection and try again.'
			)
		} else if (e.response && e.response.status === 401) {
			return responseFormat(
				'unauthorized',
				e.response.data.detail
			)
		} else {
			return responseFormat(
				'error',
				'An error occurred. Please try again later.'
			)
		}
	}
}
