import { useState } from 'react'


// import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore, auth } from "../../../firebase/fireInstance"

import NewEntry from '../NewEntry/NewEntry'
import { TodoUnit } from './TodoUnit/TodoUnit'

import "./TodoList.css"

export const TodoList = () => {

    const [showNewEntry, setShowNewEntry] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)

    // Because auth.currentUser is User | null (that is, either a User or null), you can't guarantee that uid exists.
    // By using optional chaining, we can access it: https://stackoverflow.com/a/28469563/795407
    // const uid = auth.currentUser?.uid
    const userEmail = auth.currentUser?.email

    const showNewEntryClass = showNewEntry ? null : "optional-open"


    const todosRef = firestore.collection('todos')
    const query = todosRef.where('associatedUsers', 'array-contains', userEmail) // I want to have orderBy here too but it doesn't work :S

    // const query = todosRef.orderBy('dueDate')

    const [loadedTodos] = useCollectionData(query, {idField:'id'})

    // Alternatively, use a sorting function - this also doesn't work :S But this would be more flexible for later uses.
    const sortedTodos = loadedTodos?.sort((a:any, b:any) => {
        
        const aDate = new Date(a.dueDate).getTime()
        const bDate = new Date(b.dueDate).getTime()

        return aDate - bDate})

    // Check off a task. Fetch existing completed state and update it.
    const handleChecked = async(id:string) => {
        // You're not storing the document's ID as a field inside the document,
        // so querying for id == X will not work, since id doesn't exist as a field.
        // However, we can fetch the document by its id, which is easier anyway.
        const doc = todosRef.doc(id)
        const docData = (await doc.get()).data()

        // console.log(`found doc: ${JSON.stringify(doc.data())}`)
        // The only reason id exists in your loadedTodos objects is because
        // by specifying idField as id, useCollectionData is adding the document's
        // id as an id property of the returned objects.
        // See useCollectionData in https://github.com/csfrequency/react-firebase-hooks/tree/5182e86c8711e1d6da73a70134a94b665137b545/firestore#usecollectiondata
        if (docData) {
            console.log(`Task ${docData.title}: Completed is now ${!docData.completed}`)
            doc.update({completed:!docData.completed})
        }
    }
    
    // Delete  a task. Use existing title value for logging.
    const handleDelete = async(id:string, title:string) => {
        
        const doc = todosRef.doc(id)
    
        console.log(`Task ${title} was deleted.`)
        doc.delete()
        
    }

    const clearCompleted = () => {

        const completedTodos = loadedTodos?.filter((t:any)=> t.completed)

        completedTodos?.forEach((task:any) => {
            console.log(`Delete task ${task.title}`)
            todosRef.doc(task.id).delete()
        })

        // await todosRef.where("completion", "==", true).get()
        // .then((result)=>{
        //     result.forEach((doc)=> {
        //         todosRef.doc(doc.id).delete().then(()=>
        //             console.log("Cleared a task")
        //         )
        //     })
        // })




    }


    return (
        <>
        <p onClick={()=> setShowNewEntry(!showNewEntry)}>{showNewEntry ? "Hide Form" : "Add New Item" }<i className={"fas fa-caret-down optional-icon " + showNewEntryClass}></i></p>
        <div className="optional-block">{showNewEntry && <NewEntry/>}</div>
        
        <div className="todo-list-block">

            {sortedTodos && sortedTodos?.map((todo:any) => {
                return (
                <TodoUnit 
                    key={todo.id}
                    id={todo.id}
                    user={todo.uid}
                    associatedUsers={todo.associatedUsers}
                    title={todo.title} 
                    description={todo.description}
                    dueDate={todo.dueDate.toDate().toDateString()}
                    completed={todo.completed}
                    deleteMode={deleteMode}
                    handleChecked={handleChecked}
                    handleDelete={handleDelete} 
                />)
                })
                }

        </div>
        <div className="list-button-block">
        <span className="delete-button" onClick={()=> setDeleteMode(!deleteMode)}>{deleteMode ? "Finished Removing" : "Toggle Remove" }</span>
        <span className="delete-button" onClick={clearCompleted}>Remove Completed</span>
        </div>
        </>
    )
}
