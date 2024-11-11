import React from "react";
import { InputBase, Button } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';

const formValues = {
    name: "",
    email: "",
    password: ""
}

const formSchema = new yup.ObjectSchema({
    name: yup.string().required("*Please Enter Name").min(6, "*Name should have atleast 6 characters"),
    email: yup.string().required("*Please Enter Email").email("*Invalid Email"),
    password: yup.string().required("Please Enter Password").min(8, "Password should atleast have 8 characters")
});

const Form= () => {

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: formValues,
        validationSchema: formSchema,
        onSubmit : (values, {resetForm})=>{
            console.log(values);
            resetForm({values : null});
        }
    });
    
    return (
        <div style={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{
                width: "50%",
                margin: "auto",
                boxShadow: "0px 0px 5px silver"
            }}>

                <h2 style={{ textAlign: "center" }}>Form</h2>

                    <form  onSubmit={handleSubmit}>

                        <div style={{ width: "75%", margin: "10px auto" }}>
                            <label>Name : </label><br />
                            <InputBase placeholder="Enter Name" sx={{
                                "background-color": "#BFC9CA", width: "100%",
                                padding: "5px 10px",
                                borderRadius: "5px",
                            }}
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <p style={{ color: "red" }}>{touched.name && errors.name && (errors.name)}</p>
                        </div>

                        <div style={{ width: "75%", margin: "10px auto" }}>
                            <label>Email : </label><br />
                            <InputBase placeholder="Enter Email" sx={{
                                "background-color": "#BFC9CA", width: "100%",
                                padding: "5px 10px",
                                borderRadius: "5px"
                            }}
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <p style={{ color: "red" }}>{touched.email && errors.email && (errors.email)}</p>
                        </div>

                        <div style={{ width: "75%", margin: "10px auto" }}>
                            <label>Password : </label><br />
                            <InputBase placeholder="Enter Password" sx={{
                                "background-color": "#BFC9CA", width: "100%",
                                padding: "5px 10px",
                                borderRadius: "5px"
                            }}
                                type="password"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                onBlur={handleBlur} />
                            <p style={{ color: "red" }}>{touched.password && errors.password && (errors.password)}</p>
                        </div>

                        <div style={{ width: "75%", height: "35px", margin: "30px auto" }}>
                            <Button sx={{
                                width: "100%", height: "100%", "background-color": "#00b894", border: "none", borderRadius: "5px", color: "white",
                                "&:hover": {
                                    transform: "scale(1.02)",
                                    "background-color": "#00b894"
                                }
                            }}
                                type="submit"
                    
                                > Submit </Button>
                        </div>

                    </form>

            </div>
        </div>
    )
}

export default Form;