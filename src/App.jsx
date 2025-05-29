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
        if(window.confirm("Are you sure you want to delete?")){
            const newTasks = tasks.filter((_,i) => i !== index);
            setTasks(newTasks);
        }
    }

    function markAsDone(index) {
        if (!tasks[index].done){
            if(window.confirm("Once you mark tasks as done it cannot be undone! Are you sure?")){
                const updatedTasks = [...tasks];
                updatedTasks[index].done = true;
                setTasks(updatedTasks);
            }
        }
    }

    function moveTaskUp(index) {
        if(index > 0){
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
            setTasks(newTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length-1){
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            setTasks(newTasks);
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
                       <span>
                           <Task key={index} title={task.title} />
                           <input type="checkbox" checked={task.done} disabled={task.done} onChange={() => markAsDone(index)}/>
                           <button onClick={() => deleteTask(index)}>Delete</button>
                           <button onClick={() => moveTaskUp(index)}>UP</button>
                           <button onClick={() => moveTaskDown(index)}>DOWN</button>

                       </span>

                   </li>
                ))}

            </ol>
        </div>
    )
}

export default App
