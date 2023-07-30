
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AiFillPlusCircle } from "react-icons/ai";
import { User } from "../models/user";
import { SignupCred } from "../network/meet_api";
import * as MeetsAPI from "../network/meet_api";
import { constants } from "buffer";

interface signUp {
  open: boolean;
  handleClose: ()=>void
  onSignUp: (user: User) => void;
}

const DialogComponent = ({open, handleClose, onSignUp }: signUp) => {
  
  const [formData, setFormData] = useState<SignupCred>({
    username:'',
    email:'',
    password:''
  });
  async function submitData(input: SignupCred) {
    try {
      const response = await MeetsAPI.Signup(input)
      onSignUp(response)
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      alert("Please enter the details");
      return;
    } else {
      submitData(formData);
    }
  };

  const change = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Sign Up</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the details</DialogContentText>
        </DialogContent>
        <DialogContent className="dx">
          <form action="" id="signUp" className="form" onSubmit={handleSubmit}>
            Username
            <input
              type="text"
              className="inp"
              name="username"
              placeholder="Enter the username"
              value={formData.username}
              id="un"
              onChange={change}
              required
            />
            Email
            <input
              type="text"
              className="inp"
              name="email"
              placeholder="Enter the email"
              value={formData.email}
              id="em"
              onChange={change}
            />
            Password
            <input
              type="password"
              className="inp"
              name="password"
              placeholder="Enter the password"
              value={formData.password}
              id="pw"
              onChange={change}
            />
            
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <button className="submitbtn" type="submit" form="signUp">
            SUBMIT
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
