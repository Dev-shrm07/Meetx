import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Meet } from "./models/meet";
import { User } from "./models/user";
import Mt from "./components/Meet";
import * as MeetsAPI from "./network/meet_api";
import D from "./components/d";
import Signup from "./components/signUpModal";
import N from "./components/nx";
import Login from "./components/loginModal";
import Meetloggedinpage from './pages/meetsLoggedIn'
import MeetLoggedoutpage from './pages/meetsLoggedOutpage'
import Button from "@mui/material/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { AppBar, LinearProgress } from "@mui/material";
function App() {
  const [user, setUser] = useState<User | null>(null);
  const [signupmodal, setSignupmodal] = useState(false);
  const [loginmodal, setLoginmodal] = useState(false);

  useEffect(() => {
    async function fetchLoggedinuser() {
      try {
        const res = await MeetsAPI.getLoggedinUser();
        setUser(res);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedinuser();
  }, []);
  const handlecloses = () => {
    setSignupmodal(false);
  };

  const handleClosel = () => {
    setLoginmodal(false);
  };

  const apk = (
    <>
      <N
        user={user}
        onLoginclicked={() => {setLoginmodal(true)}}
        onLogoutClicked={() => {setUser(null)}}
        onSignupclicked={() => {setSignupmodal(true)}}
        
      />
      <>
      {user ? <Meetloggedinpage/> : <MeetLoggedoutpage/>}
      </>
      <Signup open={signupmodal} handleClose={()=>setSignupmodal(false)} onSignUp={(user) => {setUser(user)}} />
      <Login open={loginmodal} handleClose={()=>setLoginmodal(false)} onLogin={(user) => {setUser(user)}} />
    </>
  );

  return <div className="main-container">{apk}</div>;
}

export default App;
