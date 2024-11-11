import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './contextApis/Context';

const Otp = () => {
    const href = useNavigate();
    const { otpEmail } = useContext(LoginContext);
    const [optVerified, setOtpVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [generatedOtp, setgeneratedOtp] = useState(null);
    const [timer, setTimer] = useState(60);

    const handleChange = (e, index) => {
        const value = e.target.value;
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            // Move to the next box if a digit is entered
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    // Function to handle OTP submit
    const handleSubmit = () => {
        if (otp.every((digit) => digit !== "")) {
            const enteredOtp = otp.join("");
            if (parseInt(enteredOtp) !== generatedOtp)
                alert("Invalid OTP");

            else
                setOtpVerified(true);

        } else {
            alert("Please enter the complete OTP.");
        }
    };

    function generateOtp() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    const sendOTP = async () => {
            const gotp = generateOtp();
            setgeneratedOtp(gotp);
            await fetch("http://localhost:5000/user/sendOTP", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    email: otpEmail,
                    otp: gotp
                })
            });
    }

    const changePassword = async () => {
        try {
            if (password !== confirmpassword){
                alert("Password and confirmed Password don't match");
                return;
            }

            const response = await fetch("http://localhost:5000/user/changepassword", {
                method : "PUT",
                headers : {
                    "Content-Type" : "Application/json"
                },
                body : JSON.stringify({
                    email : otpEmail,
                    password,
                    confirmpassword
                })
            });

            const res = await response.json();
            if (res.status === 201)
                href("/");

            else 
                alert("error in changing password")
            
        }
        catch (error) {
            alert("server not responding");
        }
    }

    useEffect(() => {
        sendOTP();
    }, [])

    useEffect(() => {
        if (timer > 0)
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);

        else
            setgeneratedOtp(null);
    }, [timer])

    return (
        <>
            <section
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    backgroundColor: '#f7f7f7',
                    padding: '30px',
                    marginTop: "50px"
                }}
            >
                <div
                    style={{
                        width: '80%',
                        height: '90%',
                        padding: '30px 70px',
                        backgroundColor: 'white',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        borderRadius: '10px',
                        textAlign: 'center'
                    }}
                >
                    {!Boolean(optVerified) ? (
                        <>
                            <div className='headingdiv' style={{ marginBottom: '20px' }}>
                                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: "20px" }}>OTP Code Sent</h1>
                                <p style={{ fontSize: '16px', color: '#555' }}>
                                    We have sent the OTP code to <strong>{otpEmail}</strong>
                                </p>
                            </div>

                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-evenly',
                                    margin: '40px 0px'
                                }}
                            >
                                {otp.map((_, index) => (
                                    <input
                                        key={index}
                                        id={`otp-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={otp[index]}
                                        onChange={(e) => handleChange(e, index)}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            textAlign: 'center',
                                            fontSize: '24px',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                            outline: 'none',
                                            transition: 'border-color 0.2s',
                                            backgroundColor: '#f9f9f9',
                                            cursor: 'pointer'
                                        }}
                                        onFocus={(e) => e.target.select()}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleSubmit}
                                style={{
                                    width: '100%',
                                    padding: '15px',
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    backgroundColor: '#4CAF50',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s',
                                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#45a049')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#4CAF50')}
                            >
                                Verify OTP
                            </button>

                            {Boolean(timer) ? (
                                <p
                                    style={{
                                        textAlign: "center",
                                        margin: "20px 0px",
                                        color: "red",
                                    }}
                                >
                                    This otp expires in {timer} s
                                </p>
                            ) : (
                                <p
                                    style={{
                                        textAlign: "center",
                                        margin: "20px 0px",
                                        color: "red",
                                        cursor: "pointer"
                                    }}
                                    onClick={() => {
                                        setTimer(60);
                                        sendOTP();
                                    }}
                                >
                                    resend otp
                                </p>
                            )}

                        </>
                    ) : (
                        <>
                            <div className='headingdiv' style={{ "margin-bottom": "20px" }}>
                                <h1><strong> Reset Password </strong></h1>
                            </div>

                            <div className='formdfields'>
                                <label className='formlabel'> Password </label>
                                <div className='inputdiv'>
                                    <input className='passinput' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} placeholder='Enter New Password'></input>
                                </div>
                            </div>

                            <div className='formdfields'>
                                <label className='formlabel'> confirm Password </label>
                                <div className='inputdiv'>
                                    <input className='passinput' type='password' value={confirmpassword} onChange={(e) => { setConfirmPassword(e.target.value) }} placeholder='Confirm Password'></input>
                                </div>
                            </div>

                            <div className='formsubmitdiv'>
                                <button className='btn formsubmit' onClick={changePassword}> Change Password </button>
                            </div>

                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default Otp;
