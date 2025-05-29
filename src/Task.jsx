import {useState} from 'react'

function Task(props){
    const [task, setTask] = useState(null);

    return (
        <div>
            <span>
                {props.title}
            </span>
        </div>
    )
}

export default Task;