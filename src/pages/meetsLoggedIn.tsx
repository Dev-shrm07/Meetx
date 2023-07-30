import * as MeetsAPI from "../network/meet_api"
import { Meet } from "../models/meet";
import { useState, useEffect } from "react";
import N from "../components/nx"
import Mt from "../components/Meet"
import D from "../components/d"
import React from "react";
import Button from "@mui/material/Button";
import { AiFillPlusCircle } from "react-icons/ai";
import { AppBar, LinearProgress } from "@mui/material";

const MeetLin = () => {
  const xh = (meet: Meet) => {
    setMeet([...meetx, meet]);
  };
  async function deleteMeet(meet: Meet) {
    try {
      await MeetsAPI.DeleteMeet(meet._id);
      setMeet(meetx.filter((emeet) => emeet._id !== meet._id));
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
  const [meetx, setMeet] = useState<Meet[]>([]);
  const [show, setShow] = useState();
  const [open, setOpen] = useState(false);
  const [openx, setOpenx] = useState(false);

  const handleedit = () => {
    setOpenx(false);
    setMeetedit(null);
  };
  const [notesloading, setNotesLoading] = useState(true);
  const [meetedit, setMeetedit] = useState<Meet | null>(null);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleupdate = (meet: Meet) => {
    setMeet(
      meetx.map((oldmeet) => (oldmeet._id === meet._id ? meet : oldmeet))
    );
    setMeetedit(null);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function loadmeet() {
      try {
        setNotesLoading(true);

        const meets = await MeetsAPI.fetchmeets();
        setMeet(meets);
      } catch (error) {
        console.error(error);
        alert(error);
      } finally {
        setNotesLoading(false);
      }
    }
    loadmeet();
  }, []);

  const apk = (
    <>
      <Button variant="outlined" onClick={handleOpen}>
        <AiFillPlusCircle className="plus" />
        Add Meet
      </Button>

      <div className="App">
        {meetx.map((m) => {
          return (
            <Mt
              meet={m}
              key={m._id}
              deleteFunc={deleteMeet}
              onclicked={() => {
                setMeetedit(m);
                setOpenx(true);
              }}
            />
          );
        })}
      </div>

      <D
        open={open}
        handleClose={handleClose}
        onSaved={(newMeet) => {
          xh(newMeet);
        }}
      />

      {meetedit && (
        <D
          open={openx}
          meetToEdit={meetedit}
          handleClose={handleedit}
          onSaved={(updatemeet) => {
            handleupdate(updatemeet);
          }}
        />
      )}
    </>
  );

  return <>{notesloading ? <LinearProgress /> : apk}</>;
};

export default MeetLin;
