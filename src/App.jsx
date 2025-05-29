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

    function deleteTask(index) { //todo use IDs instead of indexes
        const newTasks = tasks.filter((_,i) => i !== index);
        setTasks(newTasks);
    }


    return (
        <div>
            <h1>TO-DO LIST</h1>
            <input onChange={(e) => setTaskTitle(e.target.value)} value={taskTitle}/>
            <button onClick={addTask}>Add New Task</button>
            <ol>
                {tasks.map((task, index) => (
                   <li>
                       <span>
                           <Task key={index} title={task.title} />
                           <button onClick={() => deleteTask(index)}>Delete</button>

                       </span>

                   </li>
                ))}

            </ol>
        </div>
    )
}

export default App
