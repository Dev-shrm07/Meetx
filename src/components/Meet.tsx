import {Meet as MeetModel} from "../models/meet"
import {AiFillDelete} from 'react-icons/ai'
import React from "react"
interface Meetprops{
    meet: MeetModel
    onclicked:(meet:MeetModel)=>void
    deleteFunc: (meet:MeetModel)=>void
}

const Meet = ({meet, onclicked, deleteFunc}: Meetprops) =>{
    
    return(
        <div className="card" onClick={()=>onclicked(meet)}>
            <div className="box1">
                <h1 className="name">{meet.name}</h1>
                <div className="icon-container">
                    <AiFillDelete className="icon" onClick={(e)=>{
                        deleteFunc(meet)
                        e.stopPropagation()
                    }}/>
                </div>
            </div>
            <div className="box2">
                <h3 className="date">{meet.Date}</h3>
                <h3 className="time">{meet.Time}</h3>
            </div>
            <div className="box3">
                {meet.link && <a href={meet.link} className="link">Link for this Meeting</a>}
                <p className="desc">{meet.desc}</p>
            </div>
        </div>
    )

}

export default Meet