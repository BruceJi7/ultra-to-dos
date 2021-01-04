import { useState, useEffect } from 'react'


import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore, auth } from "../../../firebase/fireInstance"

import NewEntry from '../NewEntry/NewEntry'
import { TodoUnit } from './TodoUnit/TodoUnit'

import "./TodoList.css"

// type TodoType = {
//     key:number,
//     id:number,
//     title:string,
//     description:string,
//     dueDate:Date,
// }

export const TodoList = () => {

    const [showNewEntry, setShowNewEntry] = useState(false)
    const [deleteMode, setDeleteMode] = useState(false)
    const [todos, setTodos] = useState([])

    // Because auth.currentUser is User | null (that is, either a User or null), you can't guarantee that uid exists.
    // By using optional chaining, we can access it: https://stackoverflow.com/a/28469563/795407
    const uid = auth.currentUser?.uid

    const showNewEntryClass = showNewEntry ? null : "optional-open"


    const todosRef = firestore.collection('todos')
    const query = todosRef.where('associatedUsers', 'array-contains', uid) // I want to have orderBy here too but it doesn't work :S

    // const query = todosRef.orderBy('dueDate')

    const [loadedTodos] = useCollectionData(query, {idField:'id'})

    // Alternatively, use a sorting function - this also doesn't work :S But this would be more flexible for later uses.
    // const sortedTodos = loadedTodos?.sort((a, b) => {return a.dueDate > b.dueDate})


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


    return (
        <>
        <p onClick={()=> setShowNewEntry(!showNewEntry)}>{showNewEntry ? "Hide Form" : "Add New Item" }<i className={"fas fa-caret-down optional-icon " + showNewEntryClass}></i></p>
        <div className="optional-block">{showNewEntry && <NewEntry/>}</div>
        
        <div>

            {loadedTodos && loadedTodos?.map((todo:any) => {
                return (
                <TodoUnit 
                    key={todo.id}
                    id={todo.id}
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
        <p className="delete-button" onClick={()=> setDeleteMode(!deleteMode)}>{deleteMode ? "Finished Removing" : "Toggle Remove" }</p>
        </>
    )
}
