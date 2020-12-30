import './TodoUnit.css'

interface Props {
    key:number,
    title:string,
    description:string,
    dueDate:string,
    completed:boolean,
    handleChecked:(id:number) => void
} 

export const TodoUnit = (props: Props) => {
    const {title, dueDate, description, completed} = props
    return (
        <div className="todo-unit">
            <p>
                <input className="todo-checkbox" type="checkbox" checked={completed} onChange={()=>props.handleChecked(props.key)} />
                <span className="todo-title">{title}</span>
                <span className="todo-date">{dueDate}</span>
            </p>
            <p className="todo-description">{description}</p>
        </div>
    )
}
