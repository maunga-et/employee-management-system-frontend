import {createBrowserRouter, Link} from "react-router-dom";
import React from "react";
import RootLayout from "../pages/shared/Layout";
import {
	DesktopOutlined,
	PieChartOutlined,
} from '@ant-design/icons';
import Dashboard from "../pages/administrator/Dashboard";
import Employees from "../pages/administrator/Employees";
import AddEmployee from "../pages/administrator/AddEmployee";
import EmployeeDetails from "../pages/administrator/EmployeeDetails";
import LeaveManagement from "../pages/administrator/LeaveManagement";

function getItem(label, key, icon, children) {
	return {
		key,
		icon,
		children,
		label,
	};
}

const items = [
	getItem(
		<Link to="/" className='text-decoration-none'>Overview</Link>,
		'1',
		<PieChartOutlined />
	),
	getItem(
		<Link to="/employees" className='text-decoration-none'>Employees</Link>,
		'2',
		<DesktopOutlined />
	),
	getItem(
		<Link to="/leave-management" className='text-decoration-none'>Leave management</Link>,
		'3',
		<DesktopOutlined />
	),
	getItem('Projects', '4', <DesktopOutlined />),
	// getItem('User', 'sub1', <UserOutlined />, [
	// 	getItem('Tom', '3'),
	// 	getItem('Bill', '4'),
	// 	getItem('Alex', '5'),
	// ]),
	// getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
	// getItem('Files', '9', <FileOutlined />),
];

const adminRouter = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout items={items} />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: '/employees',
				element: <Employees />
			},
			{
				path: '/employees/add',
				element: <AddEmployee />
			},
			{
				path: '/employees/:id',
				element: <EmployeeDetails />
			},
			{
				path: '/leave-management',
				element: <LeaveManagement />
			},
			{
				path: '/profile/:id',
				element: <EmployeeDetails />
			}
		]
	},
]);

export default adminRouter;
