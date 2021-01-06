import { useState, useEffect } from 'react'
import firebase from 'firebase/app'

import { firestore, auth } from "../../../firebase/fireInstance"

import './NewEntry.css'

const NewEntry = () => {

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ date, setDate ] = useState(new Date().toISOString().split('T')[0])
    const [ connectUsers, setConnectUsers ] = useState<any>(null)
    
    const todosRef = firestore.collection('todos')

    // useEffect to get connect users if they exist
    useEffect(()=>{

        firestore.collection('connectUsers').where("uid", "==", auth.currentUser?.uid).get().then((snap)=>{
            const cUsers:any = []
            snap.forEach((doc)=> {
                const data  = doc.data()
    
                cUsers.push(data.connectedUsers)
        
            })

            if (cUsers.length > 0) { setConnectUsers(cUsers[0]) }
    
            
        })


    }, [])

    // useEffect 
    useEffect(()=>{

        
        console.log(connectUsers)

    },[connectUsers])


    // console.log('Testing new entry connect user list: ', usersRef )



    
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
        // setDate('')


        


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
                <input name="date" type="date" onChange={(e)=> {console.log(e.target.value); setDate(e.target.value)}} value={date}  required/>
            </p>

            <button onClick={()=> addToDo()}>Submit!</button>
        </div>
    )
}

export default NewEntry
