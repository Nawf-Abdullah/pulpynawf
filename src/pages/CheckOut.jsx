import './CheckOut.css'
import axios from 'axios'
import { useEffect, useState,useContext } from 'react'
import { useCookies } from 'react-cookie'
import Button from '../components/Button/Button'
import { Payment } from '@mui/icons-material'
import OrderPlaced from '../images/order.png'
import ItemContext from '../ItemContext'


const CheckOut = ({cartItems})=>{
    const {items} = useContext(ItemContext)
    const [cookies] = useCookies(['user'])
    const [user,setUser] = useState({
        name:'',
        email:'',
        contact:'',
        address:'',
    })
    const [orderStatus,setOrderStatus] = useState(false)
    const handleChange = (e)=>{
        setUser(prevValue=>{
            return {...prevValue,[e.target.name]:e.target.value}
        })
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        if(cookies.UserId){
            await axios.put(`http://localhost:8000/user/${cookies.UserId}`,user)
            const response = await axios.put(`http://localhost:8000/placeOrder/${cookies.UserId}`,{order:JSON.stringify({products:cartItems})})
            if(response.data.data==='success') setOrderStatus(true)
        }
        console.log("Submitted")
    }

    useEffect(()=>{
     const getUser =async ()=>{
        const response = await axios.get(`http://localhost:8000/user?userId=${cookies.UserId}`)
        setUser(response.data[0])
     }
     if(cookies.UserId){
         getUser()
        }
    },[cookies.UserId])

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])

    return <div className='checkOut'>
        {!orderStatus?<form onSubmit={handleSubmit}>
            <h1 className='confirm'>Confirm your Order</h1>
            <div className='forms'>
                <div className='inputs'>
                    <input name='name' type='text' value={user.name} placeholder='Name' required onChange={handleChange}/>
                    <input name='address' type='address' value={user.address} placeholder='Address' required onChange={handleChange}/>
                    <input type='text' name='contact' placeholder='Phonenumber' value={user.contact} required onChange={handleChange}/>
                </div>
                <table>
                    <thead>
                        <th></th>
                        <th>Name</th>
                        <th>Qty</th>
                        <th>Cost</th>
                    </thead>
                    <tbody>
                    {cartItems&&cartItems.map((cartItem,index)=>{
                        console.log(cartItem)
                        var itemImage = ''
                        if(cartItem){
                            itemImage = items.filter((item,index)=>{
                                return item.id === cartItem.product_id
                            })[0].image
                        }
                    return <>{cartItem&&<tr key={index}>
                            <td key={index} className='im'><img src={itemImage} alt=''/></td>
                            <td key={index}><p className='productName'>{cartItem.product_name}</p></td>
                            <td key={index}><p className='quantity'>{cartItem.qty}</p></td> 
                            <td key={index}><p className='cost'>₹{cartItem.cost}</p></td>
                        </tr>}</>
                    })}
                    </tbody>
                </table>
            </div>
            <Button><Payment /> Pay </Button>
        </form>:<div className='success'>
            <img src={OrderPlaced} alt='Order placed'/>
            <h1>Thank you for ordering</h1>
            <a href="https://www.flaticon.com/free-icons/order" title="order icons">Order icons created by Freepik - Flaticon</a>       
        </div>}
    </div>
}

export default CheckOut