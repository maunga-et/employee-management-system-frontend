import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {employeesUnderSupervisor} from "../../requests/employees";
import {Button, Table} from "antd";
import {PlusCircleFilled} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import AuthenticationService from "../../services/authentication.service";

const Employees = () => {
	const {tokens} = useAuth();
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const employeesTableColumns = [
		{
			key: 'employee_number',
			title: 'Employee number',
			dataIndex: 'employee_number'
		},
		{
			key: 'first_name',
			title: 'First name',
			dataIndex: 'first_name',
		},
		{
			key: 'last_name',
			title: 'Last name',
			dataIndex: 'last_name',
		},
		{
			key: 'role',
			title: 'Role',
			dataIndex: 'role',
		},
		{
			key: 'gender',
			title: 'Gender',
			dataIndex: 'gender'
		},
	]

	useEffect(() => {
		const fetchEmployees = async () => {
			setLoading(true);
			try {
				const response = await employeesUnderSupervisor(
					tokens.access,
					AuthenticationService.getEmployeeUserId(tokens.access)
				);
				setEmployees(response);
				setLoading(false);
			} catch (e) {
				setLoading(false);
				setEmployees([])
			}
		}

		fetchEmployees();
	}, [tokens.access])

	return (
		<div>
			<h5 className='mb-3'>Employees</h5>

			<Table
				loading={loading}
				columns={employeesTableColumns}
				dataSource={employees}
				size={"small"}
			/>
		</div>
	)
}

export default Employees;
