import React from "react";
import { useState, useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "./contextApis/Context";
import "./Navbar.css";

const Navbar = () => {

    const { account, setAccount } = useContext(LoginContext);
    const href = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (

        <>
            <header>
                <div className="backbutton">
                    <h2 id='navbarh2' onClick={() => {
                        href("/");
                    }}><strong>Home</strong></h2>
                </div>
                <div className="logo">
                    <Avatar className="avatar"
                        style={{"background-color" : "red"}}
                        onClick={handleClick}
                        id="basic-button">

                        {account && account.name[0].toUpperCase()}

                    </Avatar>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}>

                        {account ? (
                            <>
                                <MenuItem onClick={() => {
                                    handleClose();
                                    href("/dashboard");
                                }}>Profile</MenuItem>
                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                            </>
                        ) : (
                            <MenuItem onClick={() => {
                                handleClose();
                                href("/");
                            }}>Profile</MenuItem>
                        )}

                    </Menu>
                </div>
            </header>
        </>
    )

}

export default Navbar;