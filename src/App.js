import React from 'react';
import useAuth from "./hooks/useAuth";
import Login from "./pages/authentication/Login";
import {RouterProvider} from "react-router-dom";
import adminRouter from "./routes/administrator";
import employeeRouter from "./routes/employee";
import managerRouter from "./routes/manager";

function App() {
	const { tokens, role } = useAuth();

	if (tokens && (role === 'ADMINISTRATOR')) {
		return <RouterProvider router={adminRouter} />
	} else if (tokens && (role === 'EMPLOYEE')) {
		return <RouterProvider router={employeeRouter} />
	} else if (tokens && (role === 'MANAGER')) {
		return <RouterProvider router={managerRouter} />
	} else {
		return <Login />
	}
}

export default App;
