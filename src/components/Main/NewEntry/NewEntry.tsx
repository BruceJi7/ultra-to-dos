import { useState } from 'react'
import firebase from 'firebase/app'

import { firestore, auth } from "../../../firebase/fireInstance"

import './NewEntry.css'

const NewEntry = () => {

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ date, setDate ] = useState('')
    
    const todosRef = firestore.collection('todos')

    const addToDo = async() => {

        const dueDate = Math.floor( (new Date(date)).getTime() / 1000)
        const dueTimestamp = new firebase.firestore.Timestamp(dueDate, 0)

        await todosRef.add({
            title:title,
            description:description,
            uid:auth.currentUser?.uid,
            associatedUsers:[auth.currentUser?.uid],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            dueDate: dueTimestamp,
            completed:false
        })

        setTitle('')
        setDescription('')
        setDate('')


        


    }

    return (
        <div className="new-entry-block">
            
            <p className="new-entry-label">
                <label  htmlFor="title">Title:</label>
                <input name="title" value={title} onChange={(e)=>setTitle(e.target.value)} required/>
            </p>

            <p className="new-entry-label">
                <label  htmlFor="description">Description:</label>
                <input name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
            </p>

            <p className="new-entry-label">
                <label  htmlFor="date">Due date:</label>
                <input name="date" type="date" onChange={(e)=>setDate(e.target.value)} required/>
            </p>

            <button onClick={()=> addToDo()}>Submit!</button>
        </div>
    )
}

export default NewEntry
