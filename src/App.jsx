import Task from './Task'
import {useState} from "react";


function App() {
    const [tasks, setTasks] = useState([])
    const [taskTitle, setTaskTitle] = useState('')

    function addTask() {
        if (taskTitle.trim()) {
            const newTask = { title: taskTitle };
            setTasks(currTasks => [...currTasks, newTask]);
        } else {
            alert("Please enter title");
        }
    }


    return (
        <div>
            <h1>TO-DO LIST</h1>
            <input onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle}/>
            <button onClick={addTask}>Add New Task</button>
            <ol>
                {tasks.map((task, index) => (
                   <li>
                       <Task key={index} title={task.title} />
                   </li>
                ))}

            </ol>
        </div>
    )
}

export default App
