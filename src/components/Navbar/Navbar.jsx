import './Navbar.css'
import { Menu } from '@mui/icons-material'
import {useState} from 'react'
import {Close} from '@mui/icons-material'
import {CSSTransition} from 'react-transition-group';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Navbar = ({isLoggedIn,showModal,setShowModal,isSignUp,setIsSignUp})=>{
    const [showElements,setShowElements] = useState(false)
    const [cookie,setCookie,removeCookie] = useCookies()
    const navigate = useNavigate()
    const NavElements = <><p>Home</p>
    <p>About</p>
    {cookie.UserId?<p onClick={()=>{
        removeCookie('UserId')
        removeCookie('AuthToken')
        console.log(setCookie)
        }
    }>Logout</p>:<><p onClick={()=>{
        setIsSignUp(false)
        setShowModal(true)
        console.log('showing Modal')
    }}>Login</p>
    <p onClick={()=>{
        setIsSignUp(true)
        setShowModal(true)
    }}>Sign up</p></>}
    <p onClick={()=>navigate('/cart')}>Cart</p>
    <p>Blog</p></>
    return <nav>
        <p className='logo'>Pulpy Nawf</p>
        <div className={`nav-list`}>
            {NavElements}
        </div>
        <CSSTransition in={showElements} unmountOnExit timeout={500} classNames="menu-primary">
           <div className='nav-list show please'>
            {NavElements}
           </div>
        </CSSTransition>
        <i className='hamburger' onClick={()=>setShowElements(!showElements)}>{!showElements?<Menu />:<Close />}</i>
        </nav>
}

export default Navbar