import Greeting from "../../components/Greeting";
import AuthenticationService from "../../services/authentication.service";
import useAuth from "../../hooks/useAuth";
import StatisticCard from "../../components/StatisticCard";
import {useEffect, useState} from "react";
import {countSubordinates} from "../../requests/employees";

const Dashboard = () => {
	const {tokens} = useAuth();
	const [totalSubordinates, setTotalSubordinates] = useState(0);

	useEffect(() => {
		const fetchStatistics = async () => {
			try {
				const response = await countSubordinates(
					tokens.access,
					AuthenticationService.getEmployeeUserId(tokens.access)
					);
				setTotalSubordinates(response);
			} catch (e) {
				setTotalSubordinates(0)
			}
		}

		fetchStatistics();
	}, [tokens.access])

	return (
		<div>
			<Greeting name={AuthenticationService.getEmployeeFullName(tokens.access)}/>

			<div
				className='mt-3 row'
			>
				<div className='col-3'>
					<StatisticCard name='Total subordinates' count={totalSubordinates}/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
