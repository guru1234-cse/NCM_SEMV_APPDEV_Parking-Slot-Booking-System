import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/axiosConfig";
function Login() {

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await api.post("auth/login",{
                email,
                password
            });

            login(response.data.token);

            alert("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            alert("Invalid Email or Password");

        }

    };

    return (

        <div
            style={{
                width: "420px",
                margin: "60px auto",
                background: "#fff",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,.15)"
            }}
        >

            <h2 style={{ textAlign: "center" }}>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    style={styles.input}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    style={styles.input}
                    required
                />

                <button style={styles.button}>

                    Login

                </button>

            </form>

            <p style={{textAlign:"center",marginTop:"15px"}}>

                Don't have an account?

                <Link to="/register">

                    Register

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
fontSize:"16px",
boxSizing:"border-box"
},

button:{
width:"100%",
padding:"12px",
background:"#4F46E5",
color:"#fff",
border:"none",
borderRadius:"8px",
fontSize:"18px",
cursor:"pointer"
}

};

export default Login;