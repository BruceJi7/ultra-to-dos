import { useState, useEffect } from 'react'


// import { useAuthState } from 'react-firebase-hooks/auth'
// import { useCollectionData } from 'react-firebase-hooks/firestore'
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

    const { uid } = auth.currentUser

    const showNewEntryClass = showNewEntry ? null : "optional-open"


    useEffect(()=>{

        axios.get("/")

    },[])


    // const todosRef = firestore.collection('todos')
    // const query = todosRef.orderBy('dueDate')

    // const [loadedTodos] = useCollectionData(query, {idField:'id'})

    

    // const handleChecked = async(id:any) => {

    //     const updateQuery = todosRef.where('id', '==', id.toString())
    //         .get()
    //         .then(function(querySnapshot) {

    //             querySnapshot.forEach(function(doc){

    //                 console.log(doc.id)

    //             })

    //         })

        
        
        
        

        

    // }


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
