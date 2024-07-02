import './NumberInput.css'
import { Add } from '@mui/icons-material'
import { useState } from 'react'
import { Remove } from '@mui/icons-material'

const NumberInput = ({initialValue}) =>{
    const [number,setNumber] = useState(initialValue?initialValue:0)
    const handleChange = (e)=>{
        setNumber(Number(e.target.value))
    }
    return <span className='input'> 
        <button onClick={(e)=>{
            try{
                e.preventDefault()
            }catch(err){
                console.log(err)
            }
            if(number>0){
            setNumber(prevValue=>prevValue-1)
            }
            }}><Remove /></button>
        <input name='amount' onChange={handleChange} value={number} type='number'/>
        <button onClick={(e)=>{
             try{
                e.preventDefault()
            }catch(err){
                console.log(err)
            }
            setNumber(prevValue=>prevValue+1)}}><Add /></button>
    </span>
}

export default NumberInput