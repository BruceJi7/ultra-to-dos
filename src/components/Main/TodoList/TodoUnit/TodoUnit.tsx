import './TodoUnit.css'

interface Props {
    key: string,
    // Added the id field, since key is not supposed to be used
    // See https://reactjs.org/warnings/special-props.html
    // Also, the id is a string, not a number
    id: string,
    title:string,
    description:string,
    dueDate:string,
    completed:boolean,
    deleteMode:boolean,
    handleChecked:(id:string) => void,
    handleDelete:(id:string, title:string) => void
} 

export const TodoUnit = (props: Props) => {
    const {id, title, dueDate, description, completed, deleteMode} = props

    let check = <input className="todo-checkbox" type="checkbox" checked={completed} onChange={()=>props.handleChecked(id)} />

    if (deleteMode === true) {
        check = <i className="fas fa-minus-circle todo-delete-icon" onClick={()=>props.handleDelete(id, title)}/>
    } 


    return (
        <div className="todo-unit">
            <p className="todo-unit-table">
                <span>
                    {check}                    
                </span>
                <span className="todo-title">{title}</span>
                <span className="todo-date">{dueDate}</span>
            </p>
            <p className="todo-description">{description}</p>
        </div>
    )
}
