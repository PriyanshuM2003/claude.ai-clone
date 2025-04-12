import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();

const handleLoginSuccess = (credentialResponse) => {
  
  
    if (credentialResponse?.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      localStorage.setItem("user", JSON.stringify(decoded));
      navigate("/dashboard");
    } else {
      console.error("No credential found in response");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-6 flex justify-center items-center gap-2">
            <img
                src="/logo.svg"
                alt="My Icon"
                width={38}
                height={38}
                className="transition-transform duration-200 ease-in-out hover:scale-75"
            />
            <span className="text-3xl">Claude</span> 
        </h2>

        <GoogleLogin
        onSuccess={handleLoginSuccess}
        onError={() => console.log("Login Failed")}
      />

       
      </div>
    </div>
  );
};

export default Login;
