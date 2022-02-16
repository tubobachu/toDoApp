import { useState } from "react"
function InputForm({ isAdd, submitData, item }) {

    let [task, setTask] = useState(isAdd ? '' : item.task)
    let [description, setDescription] = useState(isAdd ? '' : item.description)
    let [date, setDate] = useState(isAdd ? new Date().toISOString().slice(0, 10) : item.date)
    let [piority, setPiority] = useState(isAdd ? "Normal" : item.piority)
    const pio = ["Low", "Normal", "high"]
    const handleSubmit = () => {
        item ? submitData({ task, description, date, piority, id: item.id }) : submitData({ task, description, date, piority })
    }

    return (
        <div className="center container">
            <input className="input100" type="text" placeholder="Add new task ..." onChange={e => setTask(e.target.value)} value={task} />
            <div className="input100 comboInput">
                <span><strong>Description</strong></span>
                <textarea className="input100" onChange={e => setDescription(e.target.value)} value={description} placeholder={isAdd ? "" : "lorem ...."}></textarea>
            </div>
            <div className="comboInput doubleInput">
                <div className="comboInput">
                    <span><strong>Due Date</strong></span>
                    <input type="date" onChange={e => setDate(e.target.value)} value={date} />
                </div>
                <div className="comboInput">
                    <span><strong>Piority</strong></span>
                    <select onChange={e => setPiority(e.target.value)} value={piority}>
                        {pio.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button className="input100 comboInput btnGreen" onClick={handleSubmit}>{isAdd ? "Add" : "Update"}</button>
        </div>
    )
}
export default InputForm;