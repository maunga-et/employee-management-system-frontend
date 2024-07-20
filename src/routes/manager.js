import {createBrowserRouter, Link} from "react-router-dom";
import React from "react";
import RootLayout from "../pages/shared/Layout";
import Dashboard from "../pages/manager/Dashboard";
import {DesktopOutlined, PieChartOutlined} from "@ant-design/icons";
import LeaveManagement from "../pages/manager/LeaveManagement";
import Employees from "../pages/manager/Employees";

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
		<Link to="/leave-management" className='text-decoration-none'>Leave management</Link>,
		'2',
		<DesktopOutlined />
	),
	getItem(
		<Link to="/employees" className='text-decoration-none'>Employees</Link>,
		'3',
		<DesktopOutlined />
	),
];

const managerRouter = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout items={items} />,
		children: [
			{
				index: true,
				element: <Dashboard />,
			},
			{
				path: '/leave-management',
				element: <LeaveManagement />
			},
			{
				path: '/employees',
				element: <Employees />
			},
		]
	},
]);

export default managerRouter;
