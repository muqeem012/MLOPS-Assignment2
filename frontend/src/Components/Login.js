import React from 'react';
import {Link} from 'react-router-dom';
import {useState,useEffect,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';
import {LoginContext} from './contextApis/Context';

const Login = ()=>{
    
    const {setAccount, setotpEmail} = useContext(LoginContext);
    const [showPass , setShowPass] = useState(false);
    //state variable for storing the inputs
    const [input,setInput] = useState({
        email : "",
        password : ""
    });
    const href = useNavigate();
    //state variable for displaying invalid credentials message
    const [invalid,setInvalid] = useState(false);

    useEffect(()=>{setInvalid(false)} , [input]);

    const setInputs = (event)=>{
        const {name , value} = event.target;
        setInput(()=>{
            return{
                ...input,
                [name] : value
            }
        })
    };

    const submitform = async ()=>{

        //first of all performing all the necessary validations
        const {email,password} = input;

        if (!email || !password )
            alert("Please Enter all the required fields");
    
        else{
               try{
                    const options = {
                        method : "POST",
                        headers : {
                            "content-type" : "application/json"
                        },
                        credentials : "include",
                        body : JSON.stringify(input)
                    };
                    const result = await fetch("http://localhost:5000/user/login", options);
                    const response = await result.json();

                    if (response.status === 200){
                        setInput({
                            email : "",
                            password : ""
                        });
                        localStorage.setItem("authToken",response.token);
                        setAccount(response.foundUser);
                        href("/dashboard");
                    }

                    else if (response.message === "Invalid Credentials")
                        setInvalid(true);

                    else
                        alert("Failed due to some Error");

                        console.log(response);
               }
               catch(error){
                    alert("Error : Server not responding");
               }    
        }    
            
    }

    return(
        <>
            <section>
                <div className='formouter'>
                    <div className='headingdiv' style={{"margin-bottom" : "20px"}}>
                        <h1><strong>Welcome Back. Log In</strong></h1>
                        <p>We are glad you are back. Please Login</p>
                        <div style={{color : "red", "text-align" : "center", visibility: invalid ? "visible" : "hidden"}}>*Invalid Credentials</div>
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
                            <button className='btn showbtn' onClick={()=>{setShowPass(!showPass)}}>
                                {showPass ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    <div className='formsubmitdiv'>
                        <button className='btn formsubmit' onClick={submitform}>Login</button>
                    </div>

                    <div>
                        <p
                            onClick = { ()=> {
                                if (Boolean(input.email)){
                                    setotpEmail(input.email)
                                    href("/otp");
                                }
                                else
                                    alert("please enter email first")
                            }}
                            style = {{textAlign: 'center', fontWeight: "bold", color : "red", cursor: "pointer"}}
                        >
                            Forgot Password
                        </p>
                    </div>

                    <div className='linkdiv'>
                        <p>Don't have an Account? <Link to="/register"> Signup </Link></p>
                    </div>
                </div>
            </section>
  
        </>
    )

}

export default Login;