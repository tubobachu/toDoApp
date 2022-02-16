import InputForm from "./component/InputForm"
import ToDoList from "./component/ToDoList";
import "./App.css";
import react, { useState, useCallback , useEffect} from "react";
function App() {

  let [toDoList, setToDoList] = useState([])
  let [idIncrease,setIdIncrease] = useState(0)
  useEffect(()=>{
    let data = JSON.parse(localStorage.getItem("todo"))
    data && setToDoList(data) 
    localStorage.getItem("inc") && setIdIncrease(Number(JSON.parse(localStorage.getItem("inc")) +1))
    
  },[])

  const handleAdd = useCallback((item) => {
    localStorage.setItem("todo",JSON.stringify([{ ...item, id: idIncrease }, ...toDoList]))
    setToDoList([{ ...item, id: idIncrease }, ...toDoList])
    setIdIncrease(idIncrease+1)
    localStorage.setItem("inc",JSON.stringify(idIncrease))
  }, [toDoList])

  const handleEdit = useCallback((item) => {
    let tdls = toDoList.map((it) => {
      return it.id === item.id ? item : it
    })
    localStorage.setItem("todo",JSON.stringify(tdls))
    setToDoList(tdls)
  }, [toDoList])

  const DoneAction = useCallback((ids) => {
    let tdls = toDoList.filter((item) => !ids.includes(item.id))
    localStorage.setItem("todo",JSON.stringify(tdls))
    setToDoList(tdls)
  }, [toDoList])

  return (
    <react.Fragment>
      <div className="newTask center border">
        <h1>New Task</h1>
        <InputForm isAdd submitData={handleAdd} />
      </div>
      <div className="toDoList center border">
        <ToDoList data={toDoList} onEdit={handleEdit} onDone={DoneAction} />
      </div>
    </react.Fragment>
  );
}

export default App;
