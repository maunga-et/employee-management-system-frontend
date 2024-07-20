import {createBrowserRouter, Link} from "react-router-dom";
import React from "react";
import RootLayout from "../pages/shared/Layout";
import {DesktopOutlined, PieChartOutlined} from "@ant-design/icons";
import Profile from "../pages/employee/Profile";
import LeaveManagement from "../pages/employee/LeaveManagement";

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
];

const employeeRouter = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout items={items} />,
		children: [
			{
				index: true,
				element: <Profile />,
			},
			{
				path: '/leave-management',
				element: <LeaveManagement />
			}
		]
	},
]);

export default employeeRouter;
