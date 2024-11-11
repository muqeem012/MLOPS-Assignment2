//This Component provides the account information of the logged in account to all the child components
import React from 'react';
import {useState, createContext} from 'react';

export const LoginContext = createContext();

const Context = ({children})=>{

    const [account,setAccount] = useState(null);
    const [otpEmail, setotpEmail] = useState(null);

    return(
        <>
            <LoginContext.Provider value={{account, setAccount, otpEmail, setotpEmail}}>
                {children}
            </LoginContext.Provider>
        </>
    )

}

export default Context;