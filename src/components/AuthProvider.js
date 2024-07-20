import React, {createContext, useState} from 'react';

export const AuthContext = createContext({});

function AuthProvider({children}) {
	const [tokens, setTokens] = useState(null);
	const [role, setRole] = useState('');

	return (
		<AuthContext.Provider value={{ tokens, role, setRole, setTokens }}>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthProvider;
