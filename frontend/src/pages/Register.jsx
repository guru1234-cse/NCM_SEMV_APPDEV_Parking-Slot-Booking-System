import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

function Register() {

    const navigate = useNavigate();

    const [user,setUser]=useState({

        name:"",
        email:"",
        password:""

    });

    const handleChange=(e)=>{

        setUser({

            ...user,

            [e.target.name]:e.target.value

        });

    };

    const register=async(e)=>{

        e.preventDefault();

        try{

            await api.post("/auth/register", user);

            alert("Registration Successful");

            navigate("/login");

        }

       catch (error) {

    console.log(error);

    console.log(error.response);

    alert(error.response?.data || "Registration Failed");

}

    };

    return(

        <div
        style={{
            width:"450px",
            margin:"60px auto",
            background:"white",
            padding:"30px",
            borderRadius:"12px",
            boxShadow:"0 4px 15px rgba(0,0,0,.15)"
        }}
        >

        <h2 style={{textAlign:"center"}}>

            Register

        </h2>

        <form onSubmit={register}>

        <input

        name="name"

        placeholder="Full Name"

        value={user.name}

        onChange={handleChange}

        style={styles.input}

        required

        />

        <input

        name="email"

        type="email"

        placeholder="Email"

        value={user.email}

        onChange={handleChange}

        style={styles.input}

        required

        />

        <input

        name="password"

        type="password"

        placeholder="Password"

        value={user.password}

        onChange={handleChange}

        style={styles.input}

        required

        />

        <button style={styles.button}>

            Register

        </button>

        </form>

        <p style={{textAlign:"center"}}>

            Already have an account?

            <Link to="/login">

                Login

            </Link>

        </p>

        </div>

    );

}

const styles={

input:{
width:"100%",
padding:"12px",
marginBottom:"15px",
borderRadius:"8px",
border:"1px solid #ccc",
fontSize:"16px"
},

button:{
width:"100%",
padding:"12px",
background:"#4F46E5",
color:"white",
border:"none",
borderRadius:"8px",
fontSize:"18px",
cursor:"pointer"
}

};

export default Register;