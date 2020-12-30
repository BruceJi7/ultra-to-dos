import { useState, useEffect } from 'react'


import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { firestore, auth } from "../../../firebase/fireInstance"

import axios from "../../../axios/axiosInstance"

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
    const [todos, setTodos] = useState([])

    // Because auth.currentUser is User | null (that is, either a User or null), you can't guarantee that uid exists.
    // By using optional chaining, we can access it: https://stackoverflow.com/a/28469563/795407
    const uid = auth.currentUser?.uid

    const showNewEntryClass = showNewEntry ? null : "optional-open"


    useEffect(()=>{

        axios.get("/")

    },[])


    const todosRef = firestore.collection('todos')
    const query = todosRef.orderBy('dueDate')

    const [loadedTodos] = useCollectionData(query, {idField:'id'})

    

    const handleChecked = async(id:any) => {

        // First we await the Promise that get() returns to get the actual query snapshot and be done with the Promise
        const querySnapshot = await todosRef.where('id', '==', id.toString()).get()
        // Now we can use the query snapshot as normal, and TypeScript recognizes it as a
        // QuerySnapshot<DocumentData> object. It also recognizes doc as QueryDocumentSnapshot<DocumentData>
        querySnapshot.forEach(function(doc){
            console.log(doc.id)
        })

        // If you have the document's actual ID, you may want to do this instead of a query:
        // const doc = await todosRef.doc(id.toString()).get()
        // console.log(doc.id)
        // However, if this "id" field you're using isn't the document's id,
        // you'll need to use the query method you already did
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
                    title={todo.title} 
                    description={todo.description}
                    dueDate={todo.dueDate.toDate().toDateString()}
                    completed={todo.completed}
                    handleChecked={handleChecked} 
                />)
                })
                }

        </div>
        </>
    )
}
