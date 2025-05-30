import Task from './Task'
import {useState, useEffect} from "react";
import { FaArrowUp, FaArrowDown, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal);

function TaskGroup(props){
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/tasks?taskGroupId=${props.id}`)
            .then(r => r.json())
            .then(setTasks);
    }, [props.id]);

    async function addTask() {
        const { value: title } = await MySwal.fire({
            title: 'Enter title',
            input: 'text',
            inputValidator: (value) => {
                return null;
            },
            showCancelButton: true,
        });

        if (title && title.trim() && /^[a-zA-Z0-9\s]+$/.test(title)) {
            const newTask = {
                title,
                done: false,
                taskGroupId: props.id,
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
                setTasks((lastTasks) => lastTasks.filter((task) => task.id !== id));
            });
        }
    }



    async function markAsDone(id) {
        const task = tasks.find((t) => t.id === id);
        if (task && !task.done) {
            const result = await MySwal.fire({
                title: 'Once you mark tasks as done it cannot be undone! Are you sure?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes',
            });

            if (result.isConfirmed) {
                fetch(`http://localhost:3001/tasks/${id}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ done: true }),
                }).then(() => {
                    const newTasks = tasks.map((t) =>
                        t.id === id ? { ...t, done: true } : t
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
            <button onClick={addTask}>Add New Task</button>
            <ol>
                {tasks.map((task, index) => (
                    <li key={task.id}>
                       <span>
                           <Task title={task.title} />
                           <input type="checkbox" checked={task.done} disabled={task.done} onChange={() => markAsDone(task.id)}/>
                           <button class="deleteBtn" onClick={() => deleteTask(task.id)}> <FaTrash /> </button>
                           <button class="upAndDownBtns" onClick={() => moveTaskUp(index)}> <FaArrowUp /> </button>
                           <button class="upAndDownBtns" onClick={() => moveTaskDown(index)}> <FaArrowDown /></button>
                       </span>

                    </li>
                ))}

            </ol>
        </div>
    )
}
export default TaskGroup;