import TaskGroup from './TaskGroup';
import {useEffect, useState, useContext } from "react";
import { UserContext } from "../App"

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
        const title = prompt('Enter title');

        if (title.trim() && /^[a-zA-Z0-9\s]+$/.test(title)) {
            const newTaskGroup = { title: title, userId: user.id};

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
            alert("Please enter a valid title");
        }
    }


    function deleteTaskGroup(id) {
        if (window.confirm("Are you sure you want to delete?")) {
            fetch(`http://localhost:3001/tasks?taskGroupId=${id}`)
                .then(r => r.json())
                .then(tasks => {
                    tasks.forEach(task => {
                        fetch(`http://localhost:3001/tasks/${task.id}`, {
                            method: "DELETE" });
                    });

                    fetch(`http://localhost:3001/taskGroups/${id}`, {
                        method: "DELETE"
                    }).then(() => {
                        setTaskGroups(lastTaskGroups => lastTaskGroups.filter(group => group.id !== id));
                    });
                });
        }
    }


    return (
        <div>
            <h1>TO-DO LIST</h1>
            {taskGroups.map((taskGroup) => (
                <span key={taskGroup.id}>
                    <TaskGroup title={taskGroup.title} userId = {user.id} />
                    <button onClick={() => deleteTaskGroup(taskGroup.id)}>Delete Task Group</button>
                </span>

            ))}
            <button onClick={addTaskGroup}>Add New Task Group</button>

        </div>
    )
}

export default Dashboard;