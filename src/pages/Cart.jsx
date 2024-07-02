import './Cart.css'
import {useCookies} from 'react-cookie'
import ItemContext from '../ItemContext'
import { useContext } from 'react'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'
import Product from '../components/Product/Product'
import Button from '../components/Button/Button'
import { useState } from 'react'
import CheckOut from './CheckOut'


const Cart = ()=>{
    const [cookie] = useCookies(['product'])
    const {items} = useContext(ItemContext)
    const [cartItems,setCartItems] = useState(Object.keys(cookie).map((cook)=>{
        return items.filter((item)=>{
           return ((cook!=="AuthToken"||cook!=="UserId")&&item.name === cook&&Number(cookie[cook])>0)
        })
    }))
    const [quantities,setQuantities] = useState(cartItems.map((cartItem,index)=>{
        if(cartItem.length>0){
        return {
            product_id:index,
            product_name:cartItem[0].name,
            qty:Number(cookie[cartItem[0].name]),
            cost:Number(cookie[cartItem[0].name])*Number(cartItem[0].price),
        }
    }
    }
    ))
    const [showCheckOutPage,setShowCheckOutPage] = useState(false)

    return <>
    {showCheckOutPage?<CheckOut cartItems={quantities} />:<> <Navbar />
    <div className="cart">
        <h1>Cart</h1>
        {cartItems.length>0?<div className='products'>
            {cartItems.map((item,index)=>{
                if(item[0]&&item[0].length>0){
                    setQuantities(prevValue=>{
                        return [...prevValue,{product_id:index,
                        product_name:item[0].name,
                        qty:Number(cookie[item[0].name]),
                        cost:Number(cookie[item[0].name])*Number(item[0].price)}]
                    })
                }
                return <>{item[0]&&<Product key={index} product={item[0].image} cost={item[0].price} initialValue={Number(cookie[item[0].name])} isCart={true} setCartItems={setCartItems}>{item[0].name}</Product>}</>
            })}
        </div>:<h3>No items</h3>}
        <Button handleClick={()=>{setShowCheckOutPage(true)}}>Check Out</Button>
    </div>
    
    <Footer /></>}
    </>
}

export default Cart