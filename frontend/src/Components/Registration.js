import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Forms.css';

const Registration = () => {

    const [showPass,setShowPass] = useState(false);
    const [showcPass,setShowcPass] = useState(false);
    //state variable for storing inputs
    const [input,setInput] = useState({
        name : "",
        email : "",
        password : "",
        cpassword : ""
    });

    const setInputs = (event)=>{
        const {name,value} = event.target;
        setInput(()=>{
            return {
                ...input,
                [name] : value
            }
        })
    };

    const submitform = async ()=>{
        //first of all performing all the necessary validations
        const {name,email,password,cpassword} = input;

        if (!name || !email || !password || !cpassword)
            alert("Please Enter all the required fields");
        
        else if (name.length < 6)
            alert("Name should atleast have 6 characters");
        
        else if (!email.includes("@"))
            alert("Invalid Email");

        else if (password.length < 8)
            alert("Password length should be atleast 8");

        else if (password !== cpassword)
            alert("Passwords don't match");

        else{
                try{
                        const options = {
                            method : "POST",
                            headers : {
                                "Content-Type" : "Application/json"
                            },
                            body : JSON.stringify(input)
                        };
                        const result = await fetch("http://localhost:5000/user/register", options);
                        const response = await result.json();
                        console.log(response);

                        if (response.status === 201){
                            setInput({
                                name : "",
                                email : "",
                                password : "",
                                cpassword : ""
                            });
                            alert("Registration Successful");
                        }
                        else if (response.error === "Email already exists")
                            alert("Email already exists");
                        else
                            alert("Failed to register");
                }
                catch(error){
                    alert("Error : Server not responding");
                }
                
        }    
            
    }

    return (
        <>
            <section>
                <div className='formouter'>
                    <div className='headingdiv'>
                        <h1><strong>Welcome. Signup </strong></h1>
                        <p>Become the part of our Application</p>
                    </div>

                    <div className='formdfields'>
                        <label className='formlabel'> Name </label>
                        <div className='inputdiv'>
                            <input type='text' name='name' value={input.name} onChange={setInputs} placeholder='Enter your Full Name'></input>
                        </div>
                    </div>

                    <div className='formdfields'>
                        <label className='formlabel'> Email </label>
                        <div className='inputdiv'>
                            <input type='email' name='email' value={input.email} onChange={setInputs} placeholder='Enter your Email'></input>
                        </div>
                    </div>

                    <div className='formdfields'>
                        <label className='formlabel'> Password </label>
                        <div className='inputdiv'>
                            <input className='passinput' type={showPass ? 'text' : 'password'} name='password' value={input.password} onChange={setInputs} placeholder='Enter your Password'></input>
                            <button className='btn showbtn' onClick={() => { setShowPass(!showPass) }}>
                                {showPass ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className='formdfields'>
                        <label className='formlabel'>Confirm Password</label>
                        <div className='inputdiv'>
                            <input className='passinput' type={showcPass ? 'text' : 'password'} name='cpassword' value={input.cpassword} onChange={setInputs} placeholder='Enter Password Again'></input>
                            <button className='btn showbtn' onClick={() => { setShowcPass(!showcPass) }}>
                                {showcPass ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className='formsubmitdiv'>
                        <button className='btn formsubmit' onClick={submitform}>Sign Up</button>
                    </div>

                    <div className='linkdiv'>
                        <p>Already have an Account? <Link to="/"> Login </Link></p>
                    </div>
                </div>
            </section>
        </>
    )

}

export default Registration;