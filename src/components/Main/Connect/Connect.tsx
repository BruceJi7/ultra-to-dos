import { useState, useEffect } from 'react'
import { firestore, auth } from "../../../firebase/fireInstance"
import firebase from 'firebase'

import './Connect.css'

const Connect = () => {

    const [allUsers, setAllUsers] = useState<Array<any>|null>(null)
    const [connectIsActive, setConnectActive] = useState<boolean>(false)
    const [userEmailToSearch, setUserEmailToSearch] = useState<string>('')
    const [message, setMessage] = useState<string>('')    
    
    const [currentUserFireBaseDoc, setCurrentUserFireBaseDoc] = useState<any>(null)

    const [currentUser] = useState(auth.currentUser)

    useEffect(()=> {

        

        firestore.collection('connectUsers').get().then((response) => {

        const users: any[] = []
        response.forEach((doc)=> {
            let data = doc.data()
            users.push(data)

            if (data.uid === currentUser?.uid) {
                console.log('User has signed up to Connect already')
                setCurrentUserFireBaseDoc(doc.id)
                setConnectActive(true)
            }
        })
        setAllUsers(users)
        console.log(allUsers)       
    })

    }, [connectIsActive])

    const handleOptIntoConnect = () => {

        firestore.collection('connectUsers').add({
            connectedUsers:[],
            uid:currentUser?.uid,
            email:currentUser?.email
        })
        .then(()=> {console.log('Success!'); setConnectActive(true)})
        .catch(e => console.error("Error connecting to connect: ", e))

    }

    const handleSubmitConnectAddress = async() => {

        // console.log(currentUserFireBaseDoc)
        
        //Filter to see if the user exists
        const userToConnectTo = allUsers?.filter((u) => {
            return u.email === userEmailToSearch
        })[0]
        // If exists, get their id and add it
        if (userToConnectTo && userToConnectTo.email !== currentUser?.email) {

            // && userToConnectTo.uid !== currentUser?.uid 
            // const userConnectedUsers = currentUserFireBaseDoc.data().connectedUsers

            const currentUserDocRef = firestore.collection('connectUsers').doc(currentUserFireBaseDoc)
            const currentUserDocResults = await currentUserDocRef.get()
            const currentUserConnections = await currentUserDocResults.data()?.connectedUsers

            console.log(currentUserDocRef)
            console.log(currentUserConnections)
            

            await currentUserDocRef.update({
                connectedUsers: firebase.firestore.FieldValue.arrayUnion(userToConnectTo.email)
            }).then(()=> {

                console.log('Successfully connected')
                setMessage(`Successfully connected with user at: ${userEmailToSearch}`)
        
            })
        } else if (userToConnectTo && userToConnectTo.email === currentUser?.email) {
            console.log('User attempts to connect with themselves')
            setMessage(`You are already connected with yourself`)
        } else {
            console.log('That person is not in the users list')
            setMessage(`No Connect user with that email address exists`)

        }
    }

    let messageBlock = null

    if (message !== '') {
            messageBlock = (
        <div className="connect-msg-block">
            <span className="connect-msg-text">{message}</span><span className="connect-msg-close-span" onClick={()=> setMessage('')}>X</span>
        </div>
            )
    }


    let connectBlock = (
        <div>
            Loading...
        </div>
    )

    if (!connectIsActive) {
        connectBlock = (
            <div>
                <p>Connect is an opt-in service.</p>
                <p>It allows you to share tasks with your friends!</p>
                <button onClick={()=>{handleOptIntoConnect()}}>Connect!</button>
            </div>
        )
    } else {
        connectBlock = (
            <div>
                <p>
                    To connect with a user, type in their email address.
                </p>
                    <input type="email" value={userEmailToSearch} onChange={e=>setUserEmailToSearch(e.target.value)} placeholder="Enter user's email"/>
                    <button onClick={() => {handleSubmitConnectAddress()}}>Connect!</button>
            </div>
        )
    }
    

    // const query = connectUsersRef.where('associatedUsers', 'array-contains', uid)
    
    return (
        <div>
            {messageBlock}
            {connectBlock}
        </div>
    )
}

export default Connect
