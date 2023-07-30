import { error } from "console";
import { Meet } from "../models/meet";
import { Dialog } from '@mui/material';
import { User } from "../models/user";


const url = "https://meetxy.onrender.com"
async function fetchdata(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(url+input, init);
  if (response.ok) {
    return response;
  } else {
    const errorbody = await response.json();
    const errormsgh = errorbody.error;
    throw Error(errormsgh);
  }
}

export interface SignupCred{
  username: string,
  email: string,
  password: string,
}

export async function Signup(input: SignupCred): Promise<User>{
  const response = await fetchdata("/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(input),
  });
  return response.json();

}

export interface logincred{
  username: string,
  password: string
}

export async function Login(input: logincred): Promise<User>{
  const response = await fetchdata("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    credentials:"include",
    body: JSON.stringify(input),
  });
  return response.json();

}

export async function logout() {
  await fetchdata("/api/users/logout", {method:"POST", credentials:"include"})
  
}



export async function getLoggedinUser () : Promise<User>{
  const user = await fetchdata('/api/users', {method:"GET", credentials:"include"})
  return user.json()
}

export interface meetinput {
  name: string;
  Date?: string;
  Time?: string;
  desc?: string;
  link?: string;
}

export async function fetchmeets(): Promise<Meet[]> {
  const response = await fetchdata("/api/meets", { method: "GET" , credentials:"include"});
  return response.json();
}

export async function DeleteMeet(meetid: string){
    await fetchdata("/api/meets/"+meetid, {method:"DELETE", credentials:"include"})

}

export async function createMeet(meet: meetinput): Promise<Meet> {
  const response = await fetchdata("/api/meets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(meet),
  });
  return response.json();
}

export async function updateMeet(meetid: string, meet: meetinput): Promise<Meet> {
  const response = await fetchdata("/api/meets/"+meetid, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials:"include",
    body: JSON.stringify(meet),
  });
  return response.json();
}
