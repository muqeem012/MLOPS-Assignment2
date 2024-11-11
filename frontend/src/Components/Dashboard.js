import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useState } from "react";
import "./Dashboard.css";
import { LoginContext } from "./contextApis/Context";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Dashboard = () => {

    const [fetching, setFetching] = useState(null);
    const { account, setAccount } = useContext(LoginContext);
    const href = useNavigate();
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
            console.log(res);

            if (res.message === "authorized") {
                setAccount(res.foundUser);
            }

            else
                href("/error");

        }
        catch (error) {
            alert("OOPs! Something went wrong");
            href("/error");
        }

    }

    useEffect(() => {
        setTimeout(authorize, 1500);
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
                <div className="dashmaindiv">
                    <div className="dashinnerdiv">
                        <div className="imgdiv">
                            <img className="dashpic" src="userPic.jpg"></img>
                        </div>
                        {account && `Welcome ${account.name}`}
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard;