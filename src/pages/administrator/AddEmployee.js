import {Button, DatePicker, Input, message, Select} from "antd";
import {COUNTRIES, EMPLOYEE_ROLES, EMPLOYMENT_TYPES, GENDER_OPTIONS} from "../../constants";
import {useEffect, useState} from "react";
import {addEmployee, listEmployees} from "../../requests/employees";
import useAuth from "../../hooks/useAuth";
import {useNavigate} from "react-router-dom";

const AddEmployee = () => {
	const [employees, setEmployees] = useState([]);
	const {tokens} = useAuth();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [addEmployeeBtnDisabled, setAddEmployeeBtnDisabled] = useState(false);

	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [middleNames, setMiddleNames] = useState("")
	const [nationalIdentificationNumber, setNationalIdentificationNumber] = useState("")
	const [role, setRole] = useState("")
	const [email, setEmail] = useState("")
	const [phoneNumber, setPhoneNumber] = useState("")
	const [dateOfBirth, setDateOfBirth] = useState("")
	const [nationality, setNationality] = useState("")
	const [dateJoined, setDateJoined] = useState("")
	const [supervisor, setSupervisor] = useState(null)
	const [employmentType, setEmploymentType] = useState("")
	const [residentialAddress, setResidentialAddress] = useState("")
	const [gender, setGender] = useState("")

	const countries = COUNTRIES.map(
		country => ({
			label: country.name,
			value: country.name,
		})
	)

	const _employees = employees.map(employee => ({
		label: `${employee.first_name} ${employee.last_name}(${employee.role})`,
		value: employee.id,
	}))

	const handleAddEmployee = async (employee) => {
		if (firstName === '') {
			message.warning("Please enter first name");
			return;
		} else if (lastName === '') {
			message.warning("Please enter last name");
			return;
		} else if (gender === '') {
			message.warning("Please select gender");
			return;
		} else if (dateOfBirth === '') {
			message.warning("Please select date of birth");
			return;
		}

		setLoading(true);
		setAddEmployeeBtnDisabled(true);

		const data = {
			first_name: firstName,
			last_name: lastName,
			middle_names: middleNames,
			gender: gender,
			national_identification_number: nationalIdentificationNumber,
			role: role,
			email: email,
			phone_number: phoneNumber,
			date_of_birth: dateOfBirth,
			nationality: nationality,
			date_joined: dateJoined,
			supervisor: supervisor,
			employment_type: employmentType,
			residential_address: residentialAddress,
			password: 'password'
		}

		try {
			const response = await addEmployee(tokens.access, data);
			if (response === 201) {
				message.success('Employee successfully added.');
				navigate('/employees');
			}
		} catch (e) {
			setLoading(false);
			setAddEmployeeBtnDisabled(false);
			message.error('An error occurred.');
		}
	}

	useEffect(() => {
		const fetchEmployees = async () => {
			try {
				const response = await listEmployees(tokens.access);
				setEmployees(response.results);
			} catch (e) {
				setEmployees([])
			}
		}

		fetchEmployees();
	}, [tokens.access])

	const handleChangeNationality = (value) => {
		setNationality(value);
	}

	const handleChangeGender = (value) => {
		setGender(value);
	}

	const handleChangeRole = (value) => {
		setRole(value);
	}

	const handleChangeSupervisor = (value) => {
		setSupervisor(value);
	}

	const handleChangeEmploymentType = (value) => {
		setEmploymentType(value);
	}

	const handleChangeDateOfBirth = (date, dateString) => {
		setDateOfBirth(dateString);
	};

	const handleChangeDateJoined = (date, dateString) => {
		setDateJoined(dateString);
	};

	return (
		<div>
			<h5 className='mb-3'>Add employee</h5>

			<div>
				<div className='mb-5'>
					<h6>Personal information</h6>
					<div className='row mb-3'>
						<div className='col-4'>
							<Input
								placeholder='First name'
								onChange={e => setFirstName(e.target.value)}
							/>
						</div>
						<div className='col-4'>
							<Input
								placeholder='Middle names'
								onChange={e => setMiddleNames(e.target.value)}
							/>
						</div>
						<div className='col-4'>
							<Input
								placeholder='Last name'
								onChange={e => setLastName(e.target.value)}
							/>
						</div>
					</div>

					<div className='row mb-3'>
						<div className='col-6'>
							<Select
								showSearch
								placeholder='Gender'
								className='w-100'
								options={GENDER_OPTIONS}
								onChange={handleChangeGender}
							/>
						</div>
						<div className='col-6'>
							<DatePicker
								placeholder='Date of birth'
								className='w-100'
								onChange={handleChangeDateOfBirth}
							/>
						</div>
					</div>

					<div className='row mb-3'>
						<div className='col-6'>
							<Input
								placeholder='ID number'
								onChange={e => setNationalIdentificationNumber(e.target.value)}
							/>
						</div>
						<div className='col-6'>
							<Select
								showSearch
								placeholder='Nationality'
								className='w-100'
								options={countries}
								onChange={handleChangeNationality}
							/>
						</div>
					</div>
				</div>

				<div className='mb-5'>
					<h6>Contact information</h6>
					<div className='row mb-3'>
						<div className='col-4'>
							<Input
								placeholder='Phone number'
								onChange={e => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div className='col-4'>
							<Input
								placeholder='Email'
								onChange={e => setEmail(e.target.value)}
							/>
						</div>
						<div className='col-4'>
							<Input
								placeholder='Residential address'
								onChange={e => setResidentialAddress(e.target.value)}
							/>
						</div>
					</div>
				</div>

				<div className='mb-5'>
					<h6>Employment information</h6>
					<div className='row mb-3'>
						<div className='col-3'>
							<Select
								showSearch
								placeholder='Supervisor'
								className='w-100'
								options={_employees}
								onChange={handleChangeSupervisor}
							/>
						</div>
						<div className='col-3'>
							<Select
								placeholder='Role'
								className='w-100'
								options={EMPLOYEE_ROLES}
								onChange={handleChangeRole}
							/>
						</div>
						<div className='col-3'>
							<Select
								placeholder='Employment type'
								className='w-100'
								options={EMPLOYMENT_TYPES}
								onChange={handleChangeEmploymentType}
							/>
						</div>
						<div className='col-3'>
							<DatePicker
								placeholder='Date joined'
								className='w-100'
								onChange={handleChangeDateJoined}
							/>
						</div>
					</div>
				</div>

				<Button
					onClick={handleAddEmployee}
					type='primary'
					loading={loading}
					disabled={addEmployeeBtnDisabled}
				>
					Add employee
				</Button>

				<Button
					onClick={() => navigate(-1)}
					className='ms-2'
				>
					Cancel
				</Button>
			</div>
		</div>
	)
}

export default AddEmployee
