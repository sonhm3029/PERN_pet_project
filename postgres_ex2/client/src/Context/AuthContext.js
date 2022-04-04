import {
    createContext
} from "react";


export const AuthProvider = createContext();

export default function AuthContext({value, children}) {
    return (
        <AuthProvider.Provider value={value}>
            {children}
        </AuthProvider.Provider>
    )
}