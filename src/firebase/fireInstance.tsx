import firebase from  'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'




// import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({

    apiKey: "AIzaSyBJV5Qir81rC7h1ytsmUW5duk0jFs6XEm8",
    authDomain: "todo-list-ee7f3.firebaseapp.com",
    projectId: "todo-list-ee7f3",
    storageBucket: "todo-list-ee7f3.appspot.com",
    messagingSenderId: "389888385661",
    appId: "1:389888385661:web:588aa7d3fe1630bed80714",
    measurementId: "G-7TH5LHCTVF"

})

const auth = firebase.auth()
const firestore = firebase.firestore()

export {auth, firestore }
