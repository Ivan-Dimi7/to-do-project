import TaskGroup from './TaskGroup';
import {useState} from "react";

function Dashboard() {
    const [taskGroups, setTaskGroups] = useState([])

    function addTaskGroup() {
        const title = prompt('Enter title');
        if (title.trim()) {
            const newTaskGroup = { title: title };
            setTaskGroups(currTasks => [...currTasks, newTaskGroup]);
        } else {
            alert("Please enter title");
        }
    }

    function deleteTaskGroup(index) { //todo use IDs instead of indexes
        if(window.confirm("Are you sure you want to delete?")){
            const newTaskGroup = taskGroups.filter((_,i) => i !== index);
            setTaskGroups(newTaskGroup);
        }
    }


    return (
        <div>
            <h1>TO-DO LIST</h1>
            {taskGroups.map((taskGroup, index) => (
                <span>
                           <TaskGroup key={index} title={taskGroup.title} />
                           <button onClick={() => deleteTaskGroup(index)}>Delete Task Group</button>
                       </span>

            ))}
            <button onClick={addTaskGroup}>Add New Task Group</button>

        </div>
    )
}

export default Dashboard;