import {Button, message, Modal, Table, Tabs} from "antd";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {
	getLeaveRequest,
	listLeaveRequests,
	listLeaveRequestsBySupervisorId,
	updateLeaveRequest
} from "../../requests/leave-requests";
import {EyeOutlined} from "@ant-design/icons";
import AuthenticationService from "../../services/authentication.service";

const LeaveManagement = () => {
	const [leaves, setLeaves] = useState([]);
	const {tokens} = useAuth();
	const [isLeaveRequestModalOpen, setIsLeaveRequestModalOpen] = useState(false);
	const [selectedLeaveRequest, setSelectedLeaveRequest] = useState({});
	const [reload, setReload] = useState(0);

	const handleViewLeaveRequest = async (id) => {
		try {
			const response = await getLeaveRequest(tokens.access, id);
			setSelectedLeaveRequest(response);
			setIsLeaveRequestModalOpen(true);
		} catch (e) {
			setSelectedLeaveRequest({})
		}
	}

	const handleUpdateLeaveRequest = async (id, action) => {
		try {
			const response = await updateLeaveRequest(tokens.access, id, {
				status: action,
				reviewed_by: AuthenticationService.getEmployeeUserId(tokens.access)
			});
			if (response === 200) {
				if (action === 'APPROVED') {
					message.success('Leave successfully approved.');
					setIsLeaveRequestModalOpen(false);
					setReload(reload + 1);
				} else if (action === 'DENIED') {
					message.success('Leave successfully denied.');
					setIsLeaveRequestModalOpen(false);
					setReload(reload + 1);
				}
			}
		} catch (e) {
			message.error('An error occurred while updating leave request.');
		}
	}

	const leaveRequestTableColumn = [
		{
			key: 'employee',
			title: 'Employee',
			dataIndex: 'employee',
			render: (text, record) => {
				return <span>{record?.employee?.first_name} {record?.employee?.last_name}</span>
			}
		},
		{
			key: 'start_date',
			title: 'Start date',
			dataIndex: 'start_date',
		},
		{
			key: 'return_date',
			title: 'Return date',
			dataIndex: 'return_date',
		},
		{
			key: 'reviewed_by',
			title: 'Reviewed by',
			dataIndex: 'reviewed_by',
			render: (text, record) => {
				if (record.reviewed_by) {
					return <span>{record?.reviewed_by?.first_name} {record?.reviewed_by?.last_name}</span>
				}
			}
		},
		{
			key: 'date_created',
			title: 'Date created',
			dataIndex: 'date_created',
		},
		{
			key: 'action',
			title: 'Action',
			dataIndex: 'action',
			render: (text, record) => {
				if (record.status === 'PENDING') {
					return (
						<div className='d-flex justify-content-sm-evenly align-items-center'>
							<EyeOutlined
								className='bg-info text-light rounded-1 p-1'
								onClick={() => handleViewLeaveRequest(record.id)}
							/>
						</div>
					)
				}
			},
			align: 'center'
		}
	]

	const leaveRequestsTableDataSource = (status) => {
		return leaves.filter(leave => leave.status === status)
	}

	const tabItems = [
		{
			key: '1',
			label: 'Pending',
			children: <Table
				title={() => <span>Pending leave requests</span>}
				columns={leaveRequestTableColumn}
				dataSource={leaveRequestsTableDataSource('PENDING')}
			/>
		},
		{
			key: '2',
			label: <span className='text-success'>Approved</span>,
			children: <Table
				title={() => <span>Approved leave requests</span>}
				columns={leaveRequestTableColumn}
				dataSource={leaveRequestsTableDataSource('APPROVED')}
			/>
		},
		{
			key: '3',
			label: <span className='text-danger'>Denied</span>,
			children: <Table
				title={() => <span>Denied leave requests</span>}
				columns={leaveRequestTableColumn}
				dataSource={leaveRequestsTableDataSource('DENIED')}
			/>
		},
	]

	useEffect(() => {
		const fetchLeaveRequests = async () => {
			try {
				const response = await listLeaveRequestsBySupervisorId(
					tokens.access,
					AuthenticationService.getEmployeeUserId(tokens.access)
				);
				setLeaves(response)
			} catch (e) {
				setLeaves([])
			}
		}

		fetchLeaveRequests();
	}, [tokens.access, reload]);

	return (
		<div>
			<h5 className='mb-3'>Leave management</h5>

			<div>
				<Tabs
					items={tabItems}
					defaultActiveKey="1"
				/>
			</div>

			<Modal
				open={isLeaveRequestModalOpen}
				okButtonProps={{
					className: 'd-none'
				}}
				cancelButtonProps={{
					className: 'd-none'
				}}
				onCancel={() => setIsLeaveRequestModalOpen(false)}
				destroyOnClose
				closable
				centered
			>
				<div className='mb-3'>
					<div className='d-flex justify-content-start align-items-center'>
						<h6 className='text-muted small'>Leave requested by &nbsp;</h6>
						<h6>
							<Link to={`/employees/${selectedLeaveRequest?.employee?.id}`}>
								{selectedLeaveRequest?.employee?.first_name} {selectedLeaveRequest?.employee?.last_name}
							</Link>
						</h6>
					</div>

					<div className='d-flex justify-content-start align-items-center'>
						<h6 className='text-muted small'>Date requested &nbsp;</h6>
						<h6>{selectedLeaveRequest?.date_created}</h6>
					</div>

					<div className='d-flex justify-content-start align-items-center'>
						<h6 className='text-muted small'>Leave start date &nbsp;</h6>
						<h6>{selectedLeaveRequest?.start_date}</h6>
					</div>

					<div className='d-flex justify-content-start align-items-center'>
						<h6 className='text-muted small'>Return date &nbsp;</h6>
						<h6>{selectedLeaveRequest?.return_date}</h6>
					</div>

					<div className='d-flex justify-content-start align-items-center'>
						<h6 className='text-muted small'>Reason &nbsp;</h6>
						<h6>{selectedLeaveRequest?.reason}</h6>
					</div>

				</div>

				<div className='d-flex justify-content-center align-items-center'>
					<Button
						onClick={() => handleUpdateLeaveRequest(selectedLeaveRequest?.id, 'APPROVED')}
						className='m-1'
						type='primary'
						block
					>
						Approve
					</Button>
					<Button
						onClick={() => handleUpdateLeaveRequest(selectedLeaveRequest?.id, 'DENIED')}
						className='m-1'
						block
						danger
					>
						Deny
					</Button>
				</div>
			</Modal>
		</div>
	)
}

export default LeaveManagement
