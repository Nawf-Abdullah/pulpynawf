import './Home.css'
import Cans from '../images/twostack.png'
import Button from '../components/Button/Button'
import { Shop } from '@mui/icons-material'
import { LocalDrink } from '@mui/icons-material'
import Navbar from '../components/Navbar/Navbar'
import Product from '../components/Product/Product'
import Mango from '../images/Mango.png'
import Strawberry from '../images/Strawberry.png'
import BlueBerry from '../images/BlueBerry.png'
import BlueBerryPowder from '../images/BlueberryPowder.png'
import StrawberryPowder from '../images/Strawberry_powder.png'
import Mango_powder from '../images/Mango__powder.png'
import { useState,useEffect } from 'react'
import Footer from '../components/Footer/Footer'
import { CSSTransition } from 'react-transition-group'
import AuthModal from '../components/AuthModal/AuthModal'

const Home = () =>{
    const [cart,setCart] = useState({})
    const [showAuthModal,setShowAuthModal] = useState(false)
    const [isSignUp,setIsSignUp] = useState(false)

    return <div className='page'><div className='home'>
    <Navbar isLoggedIn={false} showModal={showAuthModal} setShowModal={setShowAuthModal} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
    
    <CSSTransition in={showAuthModal} unmountOnExit timeout={500} classNames="theauthmodal">
            <AuthModal isSignUp={isSignUp} setShowModal={setShowAuthModal}/>
    </CSSTransition>

    <div className='content'>
        <h1 className='company-name'>Pulpy Nawf</h1>
        <p className='tagline'>Come and witness the taste of real freash juice</p>
        <div className='button-container'>
            <Button> Buy <Shop /></Button>
            <Button kind='secondary'> Know More <LocalDrink /></Button>
        </div>
    </div>
    <img src={Cans} alt='can'/>
    </div>
    <div className='about'>
        <h2>Our Products</h2>
        <div className='showcase'>
            <Product product={Strawberry} cost={200} setCart={setCart} productId={1}>Strawberry Drink</Product>
            <Product product={Mango} cost={130} setCart={setCart} productId={2}>Mango Drink</Product>
            <Product product={BlueBerry} cost={170} setCart={setCart} productId={3}>Berry Drink</Product>
        </div>
        <div className='showcase'>
            <Product product={BlueBerryPowder} cost={499} setCart={setCart} productId={4}>BlueBerry Mix</Product>
            <Product product={Mango_powder} cost={499} setCart={setCart} productId={5}>Mango Mix</Product>
            <Product product={StrawberryPowder} cost={499} setCart={setCart} productId={6}>StrawBerry Mix</Product>
        </div>
    </div>
    <Footer/>
    </div>

}
/*Photo by Andrea Piacquadio: https://www.pexels.com/photo/selective-focus-photography-of-woman-in-red-tank-top-drinking-905326/
Video by Mikhail Nilov: https://www.pexels.com/video/a-woman-drinking-fresh-coconut-juice-at-the-beach-8306858/
Photo by Vanessa Loring: https://www.pexels.com/photo/red-and-white-candy-on-red-surface-5965663/
Photo by Mikhail Nilov: https://www.pexels.com/photo/close-up-photo-of-blueberries-on-a-purple-surface-7676740/
*/

export default Home