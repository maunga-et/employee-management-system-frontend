import Greeting from "../../components/Greeting";
import AuthenticationService from "../../services/authentication.service";
import useAuth from "../../hooks/useAuth";
import StatisticCard from "../../components/StatisticCard";
import {useEffect, useState} from "react";
import {countEmployees} from "../../requests/employees";
import {countLeaveRequests} from "../../requests/leave-requests";

function Dashboard() {
	const {tokens} = useAuth();
	const [employeeCount, setEmployeeCount] = useState(0);
	const [leaveRequestsCount, setLeaveRequestsCount] = useState(0);

	useEffect(() => {
		const fetchStatistics = async () => {
			try {
				const response = await countEmployees(tokens.access);
				const leaveRequests = await countLeaveRequests(tokens.access);
				setLeaveRequestsCount(leaveRequests);
				setEmployeeCount(response);
			} catch (e) {
				setEmployeeCount(0)
			}
		}

		fetchStatistics();
	}, [tokens.access])

	return (
		<div>
			<Greeting name={AuthenticationService.getEmployeeFullName(tokens.access)} />
			<div
				className='mt-3 row'
			>
				<div className='col-3'>
					<StatisticCard name='Total employees' count={employeeCount}/>
				</div>
				<div className='col-3'>
					<StatisticCard name='Pending leave requests' count={leaveRequestsCount}/>
				</div>
			</div>
		</div>
	);
}

export default Dashboard;
