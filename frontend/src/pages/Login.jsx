import {React,useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import axios from 'axios';
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth";

const Login = () => {
  const [Values,setValues]=useState({username:"",password:""});
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value});
  };
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const submit=async()=>{
    try{
      if(Values.username==="" || Values.password==="" )
      {
        alert("All fields are required");
      }
      else
      {
        const response = await axios.post("https://e-book-mern.onrender.com/api/v1/sign-in",Values);
        dispatch(authActions.login());
        dispatch(authActions.changeRole(response.data.role));
        localStorage.setItem("id",response.data.id);
        localStorage.setItem("token",response.data.token);
        localStorage.setItem("role",response.data.role);
        navigate("/profile");
      }
    }catch(error){
  alert(error.response.data.message);
}
  };
  return (
    <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
        <p className="text-zinc-200 text-xl">Login!</p>
        <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Username
            </label>
            <input 
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholdr="username"
            name="username"
            required
            value={Values.username}
            onChange={change}
            />
          </div>
        
          <div className="mt-4">
          <div>
            <label htmlFor="" className="text-zinc-400">
              Password
            </label>
            <input 
            type="password"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholdr="password"
            name="password"
            required
            value={Values.password}
            onChange={change}
            />
          </div>
          
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300" onClick={submit}>
              Login
            </button>
          </div>
          <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
            Or
          </p>
          <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
            Don't have an account? &nbsp;
            <Link to="/signup" className="hover:text-blue-500">
             <u>SignUp</u>
            </Link>
          </p>
        </div>
          
        </div>
        
        </div>
        </div>
      
  );
};

export default Login;
