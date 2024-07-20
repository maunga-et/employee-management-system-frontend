import React, {useState} from 'react';
import {Layout, Menu} from 'antd';
import {Outlet} from "react-router-dom";
import HeaderDropdown from "../../components/HeaderDropdown";
import {LogoutOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import AuthenticationService from "../../services/authentication.service";
import useAuth from "../../hooks/useAuth";

const dropdownItems = [
	{
		key: '1',
		label: 'Profile',
		icon: <UserOutlined />
	},
	{
		key: '2',
		label: 'Settings',
		icon: <SettingOutlined />
	},
	{
		key: '3',
		label: 'Logout',
		danger: true,
		icon: <LogoutOutlined />,
	}
];

function RootLayout({items}) {
	const [collapsed, setCollapsed] = useState(false);
	const {tokens} = useAuth();

	return (
		<Layout
			style={{
				minHeight: '100vh',
			}}
		>
			<Layout.Header
				style={{
					position: 'sticky',
					top: 0,
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					zIndex: 1,
					justifyContent: 'space-between',
				}}
			>
				<h5 className='text-light fw-bolder'>Employee Management System</h5>
				<HeaderDropdown
					items={dropdownItems}
					employeeNumber={AuthenticationService.getEmployeeNumber(tokens.access)}
				/>
			</Layout.Header>
			<Layout>
				<Layout.Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
					style={{
						height: '100vh'
					}}
				>
					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline"
						items={items}
					/>
				</Layout.Sider>

				<Layout.Content>
					<div
						style={{padding: 24}}
					>
						<Outlet/>
					</div>
				</Layout.Content>

			</Layout>
			<Layout.Footer
				style={{
					textAlign: 'center',
				}}
			>
				Employee Management System
			</Layout.Footer>
		</Layout>
	);
}

export default RootLayout;
