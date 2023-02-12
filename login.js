import { useRef } from "react";
import axios from "axios";
import "./login.css";

export default function Login({myStorage,setCurrentUser}){

    const nameRef=useRef();
    const passwordRef=useRef();

    //first class functions
    const handleSubmit =async(e)=>{
        e.preventDefault();
        const logStu={
            username:nameRef.current.value,
            password:passwordRef.current.value,
            
        }
        try{
            const res = await axios.post("http://localhost:7000/api/signup/login",logStu);
            myStorage.setItem("logStu",res.data.username);
            setCurrentUser(res.data.username);
             window.location.href = '/marklist'; 
                       
        }catch(err){

            console.log(err);

        }
    }

    const handleClick =async ()=>
          
       { try{
                 window.location.href = '/register';
                       
        }catch(err){

            console.log(err);

        }
    }

    return(<div>
                <form onSubmit={handleSubmit}>
                    <div className="login">
                    <h1>Students please login here!</h1>
                    <input type="text" placeholder="username"   ref={nameRef} required="true"/>
                    <input type="password" placeholder="password" required="true" ref={passwordRef}/>
                    <button className="login">login</button>
                    <button className="login" onClick={handleClick}>Register</button>
                    <br/>
                    </div>
                </form>
                
        </div>
        );
}
