import useAuth from "../../hooks/useAuth";
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getEmployee} from "../../requests/employees";
import {Avatar, Button} from "antd";
import {ArrowLeftOutlined, UserOutlined} from "@ant-design/icons";

const EmployeeDetails = () => {
	const {tokens} = useAuth();
	const {id} = useParams();
	const [employee, setEmployee] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		const fetchEmployee = async () => {
			try {
				const response = await getEmployee(tokens.access, id);
				console.log("response", response);
				setEmployee(response)
			} catch (e) {
				setEmployee({})
			}
		}

		fetchEmployee();
	}, [id, tokens.access])

	return (
		<div>
			<div className='d-flex justify-content-start align-items-center mb-4'>
				<Button
					icon={<ArrowLeftOutlined />}
					type='ghost'
					className='rounded-circle'
					onClick={() => navigate(-1)}
				></Button>
				<h5 className='mt-2 ms-3'>Employee details</h5>
			</div>

			<div>
				<div className='row'>
					<div className='col-4'>
						<center>
							<Avatar
								size={120}
								icon={<UserOutlined />}
							/>
						</center>
					</div>
					<div className='col-8'>
						<h6>Personal information</h6>
						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>First name &nbsp;</h6>
							<h5>{employee?.first_name}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Middle names &nbsp;</h6>
							<h5>{employee?.middle_names}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Last name &nbsp;</h6>
							<h5>{employee?.last_name}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Gender &nbsp;</h6>
							<h5>{employee?.gender}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Date of birth &nbsp;</h6>
							<h5>{employee?.date_of_birth}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Nationality &nbsp;</h6>
							<h5>{employee?.nationality}</h5>
						</div>

						<h6 className='mt-3'>Contact information</h6>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Phone number &nbsp;</h6>
							<h5>{employee?.phone_number}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Email &nbsp;</h6>
							<h5>{employee?.email}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Residential address &nbsp;</h6>
							<h5>{employee?.residential_address}</h5>
						</div>

						<h6 className='mt-3'>Employment information</h6>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Employee number &nbsp;</h6>
							<h5>{employee?.employee_number}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Role &nbsp;</h6>
							<h5>{employee?.role}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Employment type &nbsp;</h6>
							<h5>{employee?.employment_type}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Date joined &nbsp;</h6>
							<h5>{employee?.date_joined}</h5>
						</div>

						<div className='d-flex justify-content-start align-items-center'>
							<h6 className='text-muted fw-light'>Reports to &nbsp;</h6>
							<h5>
								{
									employee?.supervisor && (
										<Link to={`/employees/${employee?.supervisor?.id}`}>
											{employee?.supervisor?.first_name} {employee?.supervisor?.last_name}
											({employee?.supervisor?.employee_number})
										</Link>
									)
								}
							</h5>
						</div>

					</div>
				</div>
			</div>

		</div>
	)
}

export default EmployeeDetails;
