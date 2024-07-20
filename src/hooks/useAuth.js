import {useContext} from 'react';
import {AuthContext} from "../components/AuthProvider";

function UseAuth() {
	return useContext(AuthContext)
}

export default UseAuth;
