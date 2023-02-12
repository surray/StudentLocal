import './App.css';
import  Register from './pages/register';
import Login from './pages/login';
import Marklist from './pages/marklist';
import { BrowserRouter as Router,Route } from "react-router-dom";
import {useState} from 'react';
import { useHistory } from "react-router-dom";

function App() {
  const history = useHistory();
const myStorage=window.localStorage;
const [currentUser,setCurrentUser]=useState(myStorage.getItem("logStu"));


const handleLogout = ()=>{
  myStorage.removeItem("logStu");
  setCurrentUser(null);
  window.location.href = '/login';
}


  return (
    <div className="App">
      <Router>
          <Route  path="/register">
          <Register/>
          </Route>

          <Route  path="/login">
          <Login myStorage={myStorage} setCurrentUser={setCurrentUser}/>
          </Route>
          
          <Route  path="/marklist">
           <Marklist stud={currentUser} logout={handleLogout}/>
          </Route>
          
        </Router>
    </div>
  );
}

export default App;
