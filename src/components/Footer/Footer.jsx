import './Footer.css'
import Button from '../Button/Button'
import Crush from '../../images/crush.jpg'
import { Newspaper } from '@mui/icons-material'

const Footer = ()=>{
    return <footer>
    <h2>SignUp for our new Products</h2>
    <form>
        <img src={Crush} alt='crush'/>
        <div>
            <input type='email' placeholder='Email' />
            <Button>Submit <Newspaper/></Button>
        </div>
    </form>
       <div className='credits'>
            <h3>Credits</h3>
           <a href='https://www.pexels.com/photo/clear-glass-jar-on-block-1337824/' target='_blank'>Photo by Bruno Scramgnon</a>
           <a href='remove.bg' target='_blank'>Remove Background</a>
           <a href='https://smartmockups.com/mockups/beverages' target='_blank'>Mockup</a>
       </div> 
    </footer>
}

export default Footer