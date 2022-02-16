import react, { useState,useEffect } from "react";
import InputForm from "./InputForm";

function ToDoList({ data, onEdit , onDone}) {

    let [detailSst, setDetailSst] = useState(-1)
    let [actionSst, setActionSst] = useState([])
    let [txtSearch, setTxtSearch] = useState('')
    let [filterData, setFilterData] = useState(data)

    useEffect(()=>{
        setFilterData(data)
    },[data])

    const handleDetail = (id) => {
        detailSst === id ? setDetailSst(-1) : setDetailSst(id)
    }
    const handleCheck = (id) => {

        return (e) => {
            if (e.target.checked) {
                setActionSst([id, ...actionSst])
            } else {
                let lAc = actionSst.filter(item => item !== id)
                setActionSst(lAc)
            }
        }
    }

    const handleDone = ()=>{
        onDone(actionSst)
        setActionSst([])
    }
    const handleRemove = (id)=>{
        onDone([id])
        let actS = actionSst.filter(item => item !== id)
        setActionSst(actS)
    }
    const handleSearch = e =>{
        setTxtSearch(e.target.value)
        let filDt = data.filter(item => item.task.toLowerCase().trim().includes(e.target.value.toLowerCase().trim()))
        let acSst = actionSst.filter(item => {
            for(let i of filDt){
                return i.id === item
            }
        })
        setActionSst(acSst)
        setFilterData(filDt)
    }
    return (
        <react.Fragment>
            <h1>To Do List</h1>
            <div className="center container">
                <input className="input100" type="text" placeholder="Search ..." onChange={handleSearch} value={txtSearch}/>
                {filterData.map((item, index) => (
                    <div key={item.id} className="item">
                        <div className="toDoItem">
                            <div className="toDoItem-headLeft">
                                <input type="checkbox" onChange={handleCheck(item.id)} />
                                <span>{item.task}</span>
                            </div>
                            <div className="toDoItem-headRight">
                                <button className="btnDetail" onClick={() => handleDetail(item.id)}>Detail</button>
                                <button className="btnRemove" onClick={() => handleRemove(item.id)}>Remove</button>
                            </div>
                        </div>
                        {detailSst === item.id
                            ? <div className="toDoEdit center border">
                                <InputForm key={index} isAdd={false} submitData={onEdit} item={item} ind={index} />
                            </div>
                            : ""}
                    </div>
                ))}
                {!!actionSst.length && <div className="toDoAction">
                    <div className="toDoItem-headLeft">
                        <span>Bulk Action:</span>
                    </div>
                    <div className="toDoItem-headRight">
                        <button className="btnDone" onClick={handleDone}>Done</button>
                        <button className="btnRemove" onClick={handleDone}>Remove</button>
                    </div>
                </div>}
                
            </div>
        </react.Fragment>
    );
}

export default ToDoList;
