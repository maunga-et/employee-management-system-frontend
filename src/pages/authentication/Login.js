import {Form, Input, Button, message} from 'antd';
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import useAuth from "../../hooks/useAuth";
import {login} from '../../requests/authentication'
import {useState} from "react";
import AuthenticationService from "../../services/authentication.service";

function Login() {
	const {setTokens, setRole} = useAuth();
	const [loading, setLoading] = useState(false);
	const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);

	const onFinish = async (values) => {
		setLoading(true);
		setLoginBtnDisabled(true);

		try {
			const response = await login(values);
			if (response.status === 'success') {
				setLoginBtnDisabled(false);
				setLoading(false);
				setTokens(response.data);
				setRole(AuthenticationService.getEmployeeRole(response?.data?.access));
			} else if (response.status === 'error') {
				message.error(response.data);
				setLoginBtnDisabled(false);
				setLoading(false);
			} else if (response.status === 'unauthorized') {
				message.error(response.data);
				setLoginBtnDisabled(false);
				setLoading(false);
			} else if (response.status === 'networkError') {
				message.error(response.data);
				setLoginBtnDisabled(false);
				setLoading(false);
			}
		} catch (e) {
			message.error('An error occurred. Please try again later.');
			setLoginBtnDisabled(false);
			setLoading(false);
		}
	};

	return (
		<div className='vh-100 d-flex justify-content-center align-items-center'>
			<div className='border border-1 rounded-1 p-3'>
				<h3 className='text-center'>Employee Management System</h3>
				<h4 className='text-center opacity-75'>Login</h4>

				<Form
					name="login_login"
					className="mt-5"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Form.Item
						name="employee_number"
						rules={[
							{
								required: true,
								message: 'Please input your employee number',
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Employee Number"
							size="large"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: 'Please input your password',
							},
						]}
					>
						<Input
							prefix={<LockOutlined/>}
							type="password"
							placeholder="Password"
							size="large"
						/>
					</Form.Item>

					<Form.Item>
						<Button
							type="primary"
							htmlType="submit"
							size="large"
							block={true}
							className="mt-3"
							loading={loading}
							disabled={loginBtnDisabled}
						>
							Log in
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
}

export default Login;
