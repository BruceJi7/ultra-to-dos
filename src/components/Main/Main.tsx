import { Switch, Route } from 'react-router-dom'

import Connect from './Connect/Connect'
import {TodoList} from './TodoList/TodoList'
import { SignIn }  from './SignIn/SignIn'

import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from "../../firebase/fireInstance"



const Main = () => {


    const [user] = useAuthState(auth)

    let displayedComponent = <p>Loading...</p>

    if (user) {
        displayedComponent = (
            <>
                <Switch>
                    <Route path="/connect" component={Connect}/>
                    <Route component={TodoList}/>
                </Switch>
            </>

        )
    } else {
        displayedComponent = (
            <>
                <SignIn/>
            </>

        )
    }


    return (
        <main>
            {displayedComponent}
        </main>
    )
}

export default Main
