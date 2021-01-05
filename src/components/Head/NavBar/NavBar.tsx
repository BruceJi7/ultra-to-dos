import { NavLink } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to='/connect'>Connect</NavLink>
        </nav>
    )
}

export default NavBar
