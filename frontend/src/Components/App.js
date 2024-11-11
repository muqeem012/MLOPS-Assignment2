import React from 'react';
import { useState, useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Otp from './Otp';
import Login from './Login';
import Registration from './Registration';
import Dashboard from './Dashboard';
import Error from './Error';
import { LoginContext } from './contextApis/Context';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Notfound from './Notfound';


const App = () => {

    const [fetching, setFetching] = useState(null);
    const { account, setAccount } = useContext(LoginContext);

    const authorize = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const options = {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    authorization: token
                })
            };

            const result = await fetch("http://localhost:5000/user/validate", options);
            const res = await result.json();
            setFetching(res);

            if (res.message === "authorized") {
                setAccount(res.foundUser);
            }

        }
        catch (error) {
            alert("OOPs! Something went wrong");
        }

    }

    useEffect(() => {
        setTimeout(authorize, 500);
    }, [])


    return (
        <>
            {!fetching ? (
                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "76vh" }}>
                    <div>
                        <CircularProgress color="secondary" style={{ marginLeft: "10px" }} />
                        <p style={{ textAlign: "center" }}>
                            Loading...
                        </p>
                    </div>
                </Box>
            ) : (
                <>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/register" element={<Registration />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/error" element={<Error />} />
                        <Route path="/otp" element={<Otp />} />
                        <Route path="/*" element={<Notfound/>}/>
                    </Routes>
                </>

            )}

        </>

    )

}

export default App;