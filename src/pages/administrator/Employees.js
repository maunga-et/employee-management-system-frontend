import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth";
import {listEmployees} from "../../requests/employees";
import {Button, Table} from "antd";
import {DeleteOutlined, EditOutlined, EyeOutlined, PlusCircleFilled} from "@ant-design/icons";
import {Link, useNavigate} from "react-router-dom";

const Employees = () => {
	const {tokens} = useAuth();
	const [employees, setEmployees] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const employeesTableColumns = [
		{
			key: 'employee_number',
			title: 'Employee number',
			dataIndex: 'employee_number',
			render: (text, record) => {
				return <Link to={`/employees/${record.id}`}>{text}</Link>
			}
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
			key: 'x',
			title: 'Action',
			align: 'center',
			render: (text, record) => {
				return (
					<div className='d-flex justify-content-sm-evenly align-items-center'>
						<EyeOutlined
							className='bg-info text-light rounded-1 p-1'
							onClick={() => navigate(`/employees/${record.id}`)}
						/>
						<EditOutlined className='bg-primary text-light rounded-1 p-1' />
						<DeleteOutlined className='bg-danger text-light rounded-1 p-1' />
					</div>
				)
			}
		},
	]

	useEffect(() => {
		const fetchEmployees = async () => {
			setLoading(true);
			try {
				const response = await listEmployees(tokens.access);
				setEmployees(response.results);
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
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h5>Employees</h5>
				<Button
					icon={<PlusCircleFilled />}
					type={"primary"}
					onClick={() => navigate('/employees/add')}
				>
					Add employee
				</Button>
			</div>


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
