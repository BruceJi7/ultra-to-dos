import './TodoUnit.css'
import { auth } from "../../../../firebase/fireInstance"

interface Props {
    key: string,
    // Added the id field, since key is not supposed to be used
    // See https://reactjs.org/warnings/special-props.html
    // Also, the id is a string, not a number
    id: string,
    user:string,
    associatedUsers:string[],
    title:string,
    description:string,
    dueDate:string,
    completed:boolean,
    deleteMode:boolean,
    handleChecked:(id:string) => void,
    handleDelete:(id:string, title:string) => void
} 

export const TodoUnit = (props: Props) => {
    const {id, title, dueDate, description, completed, deleteMode, user, associatedUsers} = props
    const uid = auth.currentUser?.uid

    // Completion date calculation
    const todayDate = new Date().toISOString().split('T')[0]
    const timezoneOffset = new Date(dueDate).getTimezoneOffset()
    const taskDueDateNoTimezoneCompensation = new Date(dueDate)
    const taskDueDate = new Date(taskDueDateNoTimezoneCompensation.getTime() - (timezoneOffset*60*1000)).toISOString().split('T')[0]

    // Show either completion checkbox or deletion icon
    let check = <input className="todo-checkbox" type="checkbox" checked={completed} onChange={()=>props.handleChecked(id)} />

    if (deleteMode === true) {
        check = <i className="fas fa-minus-circle todo-delete-icon" onClick={()=>props.handleDelete(id, title)}/>
    } 

    // Assign class to title if collab project and/or completed
    let titleStyle = "todo-title"
    if (completed) {
        titleStyle += " todo-completed-style"
    }
    if (uid !== user){
        titleStyle += " todo-collab-style"
    }
    
    // Assign class to date if due today
    let dateStyle = 'todo-date'
    if (taskDueDate === todayDate) {
        dateStyle += ' todo-due-today'
    } else if (taskDueDate < todayDate) {
        dateStyle += ' todo-due-elapsed'
    }

    // Add description block only if discription exists
    let descriptionBlock = null
    if (description !== '') {
        descriptionBlock = (
        <div className='todo-unit-table'>
            <span></span>
            <span className="todo-description">{description}</span>
            <span></span>
        </div>
        )
    }

    // Add associated users if it exists
    let associatedUsersBlock = null
    if (associatedUsers.length > 1) {

        const assocString = associatedUsers.slice(1).join(', ')

        associatedUsersBlock = (
            <div className='todo-unit-table'>
                <span className="todo-associated">With:</span>
                <span className="todo-associated">{assocString}</span>
                <span></span>
            </div>

        )
    }


    return (
        <div className="todo-unit">
            <div className="todo-unit-table">
                <span>
                    {check}                    
                </span>
                <span className={titleStyle}>{title}</span>
                <span className={dateStyle}>{dueDate}</span>
            </div>
            {descriptionBlock}
            {associatedUsersBlock}


        </div>
    )
}
