import {createContext, useState, ReactNode, useEffect, Dispatch, SetStateAction} from 'react';
import { useUsersCurrentUserAuthMeGet } from "../api/generated/reactQuery/auth/auth.ts";
import {UserRead} from "../api/generated/model";

interface AuthContextType {
    currentUser: UserRead | undefined;
    setCurrentUser: Dispatch<SetStateAction<UserRead | undefined>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { data: currentUserData } = useUsersCurrentUserAuthMeGet();
    const [currentUser, setCurrentUser] = useState(currentUserData);

    useEffect(() => {
        if (currentUserData !== currentUser) {
            setCurrentUser(currentUserData);
        }
    }, [currentUser, currentUserData]);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
