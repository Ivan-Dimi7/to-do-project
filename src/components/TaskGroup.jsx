import Task from './Task'
import {useState, useEffect} from "react";
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import "./TaskGroup.css"

const MySwal = withReactContent(Swal);

function TaskGroup(props){
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/tasks?taskGroupId=${props.id}&_sort=position`)
            .then(r => r.json())
            .then(setTasks);
    }, [props.id]);

    async function addTask() {
        const { value: title } = await MySwal.fire({
            title: 'Enter title',
            input: 'text',
            showCancelButton: true,
        });

        if (title && title.trim() && /^[a-zA-Z0-9\s]+$/.test(title)) {
            const newTask = {
                title,
                done: false,
                taskGroupId: props.id,
                position: tasks.length,
            };

            fetch('http://localhost:3001/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask),
            })
                .then((r) => r.json())
                .then((data) => {
                    setTasks((lastTasks) => [...lastTasks, data]);
                });
        } else {
            await MySwal.fire('Please enter a valid title');
        }
    }


    async function deleteTask(id) {
        const result = await MySwal.fire({
            title: 'Are you sure you want to delete?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
        });

        if (result.isConfirmed) {
            fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'DELETE',
            }).then(() => {
                setTasks((lastTasks) => {
                    const newTasks = lastTasks.filter((task) => task.id !== id);
                    updateTaskPositions(newTasks);
                    return newTasks;
                });
            });
        }
    }



    async function markAsDone(id) {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            fetch(`http://localhost:3001/tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !task.done }),
            }).then(() => {
                const newTasks = tasks.map((t) =>
                    t.id === id ? { ...t, done: !task.done } : t
                );
                setTasks(newTasks);
            });
        }
    }


    function updateTaskPositions(updatedTasks) {
        updatedTasks.forEach((task, index) => {
            fetch(`http://localhost:3001/tasks/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ position: index }),
            });
        });
    }


    function moveTaskUp(index) {
        if(index > 0){
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
            setTasks(newTasks);
            updateTaskPositions(newTasks);
        }
    }

    function moveTaskDown(index) {
        if(index < tasks.length-1){
            const newTasks = [...tasks];
            [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
            setTasks(newTasks);
            updateTaskPositions(newTasks);
        }
    }

    return (
        <div id="tasks">
            <button id="addTaskBtn" onClick={addTask}>Add New Task <FaPlus/></button>
            <ol>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                       <span id="taskStuff">
                           <Task title={task.title} />
                           <input id="taskDone" type="checkbox" checked={task.done} onChange={() => markAsDone(task.id)}/>
                           <button id="deleteTaskBtn" onClick={() => deleteTask(task.id)}> <FaTrash /> </button>
                           <button className="upAndDownBtns" onClick={() => moveTaskUp(index)}> <FaArrowUp /> </button>
                           <button className="upAndDownBtns" onClick={() => moveTaskDown(index)}> <FaArrowDown /></button>
                       </span>

                    </li>
                ))}

            </ol>
        </div>
    )
}
export default TaskGroup;