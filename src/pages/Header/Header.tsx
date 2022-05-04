import {NavLink} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {PATH} from "../../enams/paths"
import './Header.css'

export const Header = () => {

    const dispatch = useDispatch()


    return <div>
            <nav className='header'>
                <div><NavLink to={PATH.LOGIN}>
                    Log In
                </NavLink></div>
                <div><NavLink to={PATH.PROFILE}>
                    Profile
                </NavLink></div>
                <div><NavLink to={PATH.REGISTRATION}>
                    Registration
                </NavLink></div>
                <div><NavLink to={PATH.PASSWORD_RESTORATION}>
                    Password recovery
                </NavLink></div>
                <div><NavLink to={PATH.PACKS}>
                    Packs List
                </NavLink></div>
            </nav>
        </div>
}