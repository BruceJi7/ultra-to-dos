import firebase from  'firebase/app'

import { auth } from "../../../firebase/fireInstance"

export const SignIn = () => {

    const signInWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider()

        auth.signInWithPopup(provider)

    }

    return (
        <div>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
}

export const SignOut = () => {

    return auth.currentUser && (

        <button onClick={() => auth.signOut()}>Sign Out</button>

    )
}
