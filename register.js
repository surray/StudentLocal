import { useRef,Link } from "react";
import axios from "axios";
import "./register.css";


export default function Register(){

   
    const nameRef=useRef();
    const emailRef=useRef();
    const passwordRef=useRef();
    //first class functions
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const newStu={
            username:nameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }
        try{
            await axios.post("http://localhost:7000/api/signup/register",newStu);
             window.location.href = '/login';
           
        }catch(err){

            console.log(err);
          

        }
    }

    return(<div>
                <form onSubmit={handleSubmit}>
                    <div className="register">
                    <h1>Students please register here!</h1>
                    <input type="text" placeholder="username" ref={nameRef} required="true"/>
                    <input type="email" placeholder="email" ref={emailRef} required="true"/>
                    <input type="password" placeholder="password" ref={passwordRef} required="true"/>
                                 
                    <button className="signup">SignUp</button>
                    <br/>
                    
                    
                    </div>
                </form>
               
        </div>
        );
}
