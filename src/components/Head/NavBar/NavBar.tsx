import { NavLink } from 'react-router-dom'

import './NavBar.css'

const NavBar = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to='/new'>New Item</NavLink>
        </nav>
    )
}

export default NavBar
