import './Product.css'
import NumberInput from '../NumberInput/NumberInput'
import Button from '../Button/Button'
import { useCookies } from 'react-cookie'
import { useContext, useEffect, useState } from 'react'
import ItemContext from '../../ItemContext'
import {CSSTransition} from 'react-transition-group';

const Product = ({children,product,description,cost,setCart,productId,initialValue,isCart,setCartItems})=>{
    const [cookie,setCookie,removeCookie] = useCookies(null)
    const [productAnimation,setProductAnimation] = useState(false)
    const handleSubmit = (e)=>{
        e.preventDefault()
        if(Number(e.target.amount.value)>0){
        setCookie(e.target.name.value,e.target.amount.value)
        setProductAnimation(true)
        }else{
            alert("Items should be grater than 0")
        }

    }

    useEffect(()=>{
        setInterval(() => {
            if(productAnimation){
                setProductAnimation(false)
            }
        }, 2000);
    },[productAnimation])

    const {items} = useContext(ItemContext)
    return <div className="product" style={isCart&&{display:'flex',width:'40%',flexDirection:'row',justifyContent:'flex-start',alignItems:'center'}}>
        <img style={isCart&&{width:'200px',objectFit:'cover'}} src={product} alt={children}/>
        <div>
            <h3>{children}</h3>
            <p className="cost"><span className='fake'>₹{Math.round(cost+((10/300)*cost),2)}</span> <span>₹{cost}</span></p>
            <form onSubmit={handleSubmit}>
                <NumberInput initialValue={initialValue?Number(initialValue):0}/>
                <input type='text' name='name' value={children} hidden/>
                <div className='button-container'>
                    <Button>{isCart?'Update':'Add to cart'}</Button>
                    {isCart&&<Button kind='secondary' handleClick={(e)=>{
                        try{
                            e.preventDefault()
                        }catch(err){
                            console.log(err)
                        }
                        removeCookie(children,cookie[children])
                        setCartItems(Object.keys(cookie).map((cook)=>{
                            return items.filter((item)=>{
                            return (cook!=="AuthToken"&&cook!=="UserId"&&item.name === cook&&Number(cookie[cook])>0)
                            })
                        }))
                        window.location.reload()
                    }}>Delete</Button>}
                </div>
            </form>
        </div>
        <CSSTransition in={productAnimation} unmountOnExit timeout={1000} classNames="adding">
                <img style={{width:'200px',objectFit:'cover'}} src={product} alt='' className='lol' key={product}/>
        </CSSTransition>
    </div>
}

export default Product