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
    handleChecked:(id:string) => void
} 

export const TodoUnit = (props: Props) => {
    const {id, title, dueDate, description, completed} = props
    return (
        <div className="todo-unit">
            <p>
                <input className="todo-checkbox" type="checkbox" checked={completed} onChange={()=>props.handleChecked(id)} />
                <span className="todo-title">{title}</span>
                <span className="todo-date">{dueDate}</span>
            </p>
            <p className="todo-description">{description}</p>
        </div>
    )
}
