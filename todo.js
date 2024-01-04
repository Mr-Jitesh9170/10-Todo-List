import React, { useState } from "react";
import "./todo.scss"
import DELETE from "./deleteTASK.svg"
import EDIT from "./taskEdit.svg"
import TASK from "./taskList.svg"

export const TOODOO = () => {
  const [popup, setpopup] = useState(false)
  // input boxes--->
  const [inputTitle, setInputTitle] = useState({
    TitleName: "",
    YourWork: ""
  }) 
  // Popup function------->
  const Popup = () => {
    popup ? setpopup(false) : setpopup(true)  
  }

  // input data to save---->
  const [save, setSave] = useState([{
    TitleSave: "",
    YourWorkSave: ""
  }])
  const [edit, setEdit] = useState("true")
  // handle Save --
  const handleSave = () => {
    if (edit == "true") {
      setSave([...save, {
        TitleSave: inputTitle.TitleName,
        YourWorkSave: inputTitle.YourWork
      }])
    }
    else {
      let arr = [...save]
      arr[edit].TitleSave = inputTitle.TitleName;
      arr[edit].YourWorkSave = inputTitle.YourWork;
      setSave([...arr])
      setEdit("true")
    }
    setInputTitle({
      TitleName: "",
      YourWork: ""
    })
    setpopup(false)
  }
  return (
    <div className="todo-container">
      {/* 1---------> */}
      <div className="todo-top">
        <div className="todo-heading">
          <h1>Todo APP {save.TitleSave}</h1>
          <img width={30} src={TASK} alt="" />
        </div>
        <button className="todo-btn" onClick={Popup}>😃 Create Your Task</button>
      </div>
      {/* 2----------> */}
      <div className="todo-mid">
        {popup && <PopPage handleSave={handleSave} setInputTitle={setInputTitle} inputTitle={inputTitle} edit={edit} />
        }      </div>
      {/* 3----------> */}
      <div className="todo-bottom">
        {
          save.map((_, index) => {
            if (_.TitleSave.trim() != "" || _.YourWorkSave.trim() != "")
              return <TaskContainer title={_.TitleSave} paragraph={_.YourWorkSave} Save={save} Index={index} SetSave={setSave} SetInput={setInputTitle} SetEdit={setEdit} setpopup={setpopup} />
          })
        }
      </div>
    </div>
  )
}


// Pop up page ----------------->
const PopPage = ({ handleSave, setInputTitle, inputTitle, edit }) => {
  return (
    <div className="popup-open">
      <input type="text" placeholder="title here..." value={inputTitle.TitleName} onChange={(event) => {
        setInputTitle({
          ...inputTitle,
          TitleName: event.target.value
        })
      }} />
      <textarea value={inputTitle.YourWork} onChange={(event) => {
        setInputTitle({
          ...inputTitle,
          YourWork: event.target.value
        })
      }} rows={10} cols={40} placeholder="enter Your task..." />
      {
        (edit != "true") ? <button onClick={handleSave}>Update🙂</button> : <button onClick={handleSave}>Save🥰</button>
      }
    </div>
  )
}


// for TODO APP to reuse the components ---->
const TaskContainer = ({ title, paragraph, Index, Save, SetSave, SetInput, SetEdit, setpopup }) => {
  // handle update 
  const handleUpdate = () => {
    SetInput({
      TitleName: title,
      YourWork: paragraph
    })
    SetEdit(Index)
    setpopup(true)
  }
  // handle delete for the 
  const handleDelete = () => {
    let jay = []
    jay = Save.filter((ele, i) => {
      if (Index != i)
        return ele
    })
    SetSave([...jay])
  }
  return (
    <div className="task-container">
      <div className="task-head">
        <h3>{title}</h3>
        <div className="icons">
          <img src={EDIT} alt="" width={20} onClick={handleUpdate} />
          <img src={DELETE} alt="" width={20} onClick={handleDelete} />
        </div>
      </div>
      <hr />
      <p className="task-data">{paragraph}</p>
    </div>
  )
}