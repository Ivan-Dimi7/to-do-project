import {useState} from 'react'

function Task(props){
    const [task, setTask] = useState(null);

    return (
        <div>
                {props.title}
        </div>
    )
}

export default Task;