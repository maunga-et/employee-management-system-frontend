import {Button, DatePicker, Input, message, Modal, Table, Tabs} from "antd";
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {
	createLeaveRequest,
	getLeaveRequest,
	listLeaveRequestsByEmployeeId,
	updateLeaveRequest
} from "../../requests/leave-requests";
import {DeleteOutlined, EyeOutlined, PlusCircleFilled} from "@ant-design/icons";
import AuthenticationService from "../../services/authentication.service";

const LeaveManagement = () => {
	const [leaves, setLeaves] = useState([]);
	const {tokens} = useAuth();
	const [isLeaveRequestModalOpen, setIsLeaveRequestModalOpen] = useState(false);
	const [selectedLeaveRequest, setSelectedLeaveRequest] = useState({});
	const [reload, setReload] = useState(0);
	const [isInitiateLeaveRequestModalOpen, setIsInitiateLeaveRequestModalOpen] = useState(false);
	const [startDate, setStartDate] = useState('');
	const [endDate, setEndDate] = useState('');
	const [reason, setReason] = useState('');

	const handleChangeStartDate = (date, dateString) => {
		setStartDate(dateString);
	}

	const handleChangeEndDate = (date, dateString) => {
		setEndDate(dateString);
	}

	const handleCreateLeaveRequest = async () => {
		if (startDate === '') {
			message.error('Please enter start date.');
			return;
		} else if (endDate === '') {
			message.error('Please enter end date.');
			return;
		} else if (reason === '') {
			message.error('Please enter reason.');
		}

		try {
			const response = await createLeaveRequest(
				tokens.access,
				{
					start_date: startDate,
					return_date: endDate,
					reason: reason,
					employee: AuthenticationService.getEmployeeUserId(tokens.access)
				}
			)

			if (response === 201) {
				message.success('Leave request submitted.');
				setIsInitiateLeaveRequestModalOpen(false);
				setReload(reload + 1);
			} else if (response === -1) {
				message.error('Error submitting leave request.');
				setIsInitiateLeaveRequestModalOpen(false);
			}
		} catch (e) {
			message.error('Error submitting leave request.');
		}
	}

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
							<DeleteOutlined
								className='bg-danger text-light rounded-1 p-1'
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
		return leaves?.filter(leave => leave?.status === status)
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
				const response = await listLeaveRequestsByEmployeeId(
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
			<div className='d-flex justify-content-between align-items-center mb-3'>
				<h5>Leave management</h5>
				<Button
					icon={<PlusCircleFilled/>}
					type={"primary"}
					onClick={() => setIsInitiateLeaveRequestModalOpen(true)}
				>
					Request leave
				</Button>
			</div>

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
							{selectedLeaveRequest?.employee?.first_name} {selectedLeaveRequest?.employee?.last_name}
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
			</Modal>


			<Modal
				title='Leave request form'
				open={isInitiateLeaveRequestModalOpen}
				onCancel={() => setIsInitiateLeaveRequestModalOpen(false)}
				onOk={handleCreateLeaveRequest}
				destroyOnClose
				closable
			>
				<DatePicker
					className='w-100 mb-3'
					placeholder='Start date'
					onChange={handleChangeStartDate}
				/>

				<DatePicker
					className='w-100 mb-3'
					placeholder='Leave end date'
					onChange={handleChangeEndDate}
				/>

				<Input.TextArea
					autoSize={{ minRows: 6, maxRows: 12 }}
					placeholder='Reason'
					onChange={e => setReason(e.target.value)}
				/>

			</Modal>
		</div>
	)
}

export default LeaveManagement
