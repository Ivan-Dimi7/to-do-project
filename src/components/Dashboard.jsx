import TaskGroup from './TaskGroup';
import {useEffect, useState, useContext } from "react";
import { UserContext } from "../App"
import { FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import "./Dashboard.css"
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Dashboard() {
    const [taskGroups, setTaskGroups] = useState([])
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:3001/taskGroups?userId=${user.id}`)
                .then(res => res.json())
                .then(setTaskGroups);
        }
    }, [user]);


    function addTaskGroup() {
        MySwal.fire({
            title: 'Enter title',
            input: 'text',
            inputPlaceholder: 'Task group title',
            showCancelButton: true,
        }).then(result => {
            if(result.isConfirmed){
                const title = result.value;

                if (title.trim() && /^[a-zA-Z0-9\s]+$/.test(title)) {
                    const newTaskGroup = {
                        title: title,
                        userId: user.id,
                        createdAt: new Date().toLocaleDateString()
                    };

                    fetch("http://localhost:3001/taskGroups", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newTaskGroup)
                    })
                        .then(r => r.json())
                        .then(data => {
                            setTaskGroups(taskGroups => [...taskGroups, data]);
                        });
                } else {
                    MySwal.fire("Please enter a valid title");
                }
            }
        });
    }



    function deleteTaskGroup(id) {
        MySwal.fire({
            title: "Are you sure you want to delete?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        }).then(result => {
            if(result.isConfirmed){
                fetch(`http://localhost:3001/tasks?taskGroupId=${id}`)
                    .then(r => r.json())
                    .then(tasks => {
                        tasks.forEach(task => {
                            fetch(`http://localhost:3001/tasks/${task.id}`, {
                                method: "DELETE",
                            });
                        });

                        fetch(`http://localhost:3001/taskGroups/${id}`, {
                            method: "DELETE",
                        }).then(() => {
                            setTaskGroups(lastTaskGroups => lastTaskGroups.filter(group => group.id !== id));
                        });
                    });
            }
        });
    }



    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title">TO-DO LIST</h1>

            <div className="add-button-container">
                <button id="addTaskGroupBtn" onClick={addTaskGroup}>
                    Add New Task Group <FaPlus />
                </button>
            </div>

            <div className="task-groups-row">
                {taskGroups.map((taskGroup) => (
                    <div key={taskGroup.id} className="task-group-box">
                        <div className="task-group-header">
                            <h2 id="taskGroupTitle">{taskGroup.title}</h2>
                            <button className="deleteTaskGroupBtn" onClick={() => deleteTaskGroup(taskGroup.id)}>
                                <FaTrash />
                            </button>
                        </div>
                        <p className="created-at">Created {taskGroup.createdAt}</p>

                        <TaskGroup
                            title={taskGroup.title}
                            userId={user.id}
                            id={taskGroup.id}
                            createdAt={taskGroup.createdAt}
                        />
                    </div>
                ))}
            </div>
        </div>




    )
}

export default Dashboard;