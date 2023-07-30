
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { AiFillPlusCircle } from "react-icons/ai";
import { Meet } from "../models/meet";
import { meetinput } from "../network/meet_api";
import * as MeetsAPI from "../network/meet_api";
import { constants } from "buffer";

interface addMeet {
  open: boolean;
  handleClose: ()=>void
  meetToEdit?: Meet;
  onSaved: (meet: Meet) => void;
}

const DialogComponent = ({open, handleClose, meetToEdit, onSaved }: addMeet) => {
  let x: meetinput = {
    name: "",
    Date: "",
    Time: "",
    link: "",
    desc: "",
  };
  if (meetToEdit) {
    x.name = meetToEdit.name;
    x.Date = meetToEdit.Date;
    x.Time = meetToEdit.Time;
    x.link = meetToEdit.link;
    x.desc = meetToEdit.desc;
  }
  const [formData, setFormData] = useState<meetinput>(x);
  async function submitData(input: meetinput) {
    try {
      let response: Meet;
      if (meetToEdit) {
        response = await MeetsAPI.updateMeet(meetToEdit._id, input);
      } else {
        response = await MeetsAPI.createMeet(input);
      }
      onSaved(response);
      handleClose();
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert("Please enter the title");
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
        <DialogTitle>{meetToEdit ? "Edit a Meet" : "Add a meet"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter the details</DialogContentText>
        </DialogContent>
        <DialogContent className="dx">
          <form action="" id="addMeet" className="form" onSubmit={handleSubmit}>
            Title
            <input
              type="text"
              className="inp"
              name="name"
              placeholder="Enter the title"
              value={formData.name}
              id="1"
              onChange={change}
              required
            />
            Date
            <input
              type="text"
              className="inp"
              name="Date"
              placeholder="Enter the Date DD/MM/YYYY"
              value={formData.Date}
              id="2"
              onChange={change}
            />
            Time
            <input
              type="text"
              className="inp"
              name="Time"
              placeholder="Enter the Time 00:00 hrs"
              value={formData.Time}
              id="3"
              onChange={change}
            />
            Link
            <input
              type="text"
              className="inp"
              id="4"
              name="link"
              placeholder="Enter the Link"
              value={formData.link}
              onChange={change}
            />
            Desc
            <input
              className="inp"
              placeholder="Enter the Desc"
              name="desc"
              value={formData.desc}
              id="5"
              onChange={change}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <button className="submitbtn" type="submit" form="addMeet">
            SUBMIT
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
