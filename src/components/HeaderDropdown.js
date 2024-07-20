import React from 'react';
import {Avatar, Dropdown} from 'antd';
import {UserOutlined} from "@ant-design/icons";

const HeaderDropdown = ({items, employeeNumber}) => (
	<Dropdown menu={{ items }}>
		{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
		<a
			onClick={(e) => e.preventDefault()}
			className='text-decoration-none text-light'
		>
			<div>
				<Avatar
					icon={<UserOutlined />}
					size='default'
					style={{backgroundColor: 'lightgrey'}}
				/>
				&nbsp; &nbsp;
				{employeeNumber}
			</div>
		</a>
	</Dropdown>
);

export default HeaderDropdown;
