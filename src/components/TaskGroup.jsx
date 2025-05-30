import Task from './Task'
import {useState, useEffect} from "react";

function TaskGroup(props){
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/tasks?taskGroupId=${props.id}`)
            .then(r => r.json())
            .then(setTasks);
    }, [props.id]);

    function addTask() {
        const title = prompt('Enter title');
        if (title.trim() && /^[a-zA-Z0-9\s]+$/.test(title)) {
            const newTask = {
                title,
                done: false,
                taskGroupId: props.id
            };

            fetch("http://localhost:3001/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newTask)
            })
                .then(r => r.json())
                .then(data => {
                    setTasks(lastTasks => [...lastTasks, data]);
                });
        } else {
            alert("Please enter a valid title");
        }
    }

    function deleteTask(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch(`http://localhost:3001/tasks/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    setTasks(lastTasks => lastTasks.filter(task => task.id !== id));
                });
        }
    }


    function markAsDone(id) {
        const task = tasks.find(t => t.id === id);
        if(task && !task.done) {
            if(window.confirm("Once you mark tasks as done it cannot be undone! Are you sure?")){

                fetch(`http://localhost:3001/tasks/${id}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ done: true })
                }).then(() => {
                    const newTasks = tasks.map(t =>
                        t.id === id ? {...t, done: true} : t
                    );
                    setTasks(newTasks);
                });
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
            <h2>{props.title}</h2>
            <button onClick={addTask}>Add New Task</button>
            <ol>
                {tasks.map((task, index) => (
                    <li>
                       <span>
                           <Task key={task.id} title={task.title} />
                           <input type="checkbox" checked={task.done} disabled={task.done} onChange={() => markAsDone(task.id)}/>
                           <button onClick={() => deleteTask(task.id)}>Delete</button>
                           <button onClick={() => moveTaskUp(index)}>UP</button>
                           <button onClick={() => moveTaskDown(index)}>DOWN</button>

                       </span>

                    </li>
                ))}

            </ol>
        </div>
    )
}
export default TaskGroup;