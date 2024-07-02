import {createContext} from  'react'
import Mango from './images/Mango.png'
import Strawberry from './images/Strawberry.png'
import BlueBerry from './images/BlueBerry.png'
import BlueBerryPowder from './images/BlueberryPowder.png'
import StrawberryPowder from './images/Strawberry_powder.png'
import Mango_powder from './images/Mango__powder.png'

const ItemContext = createContext()

export function ItemProvider({children}){
    const items = [
        {
            id:0,
            name:'Strawberry Drink',
            category:'drink',
            price:100,
            image:Strawberry
        },
        {
            id:1,
            name:'Berry Drink',
            category:'drink',
            price:100,
            image:BlueBerry
        },
        {
            id:2,
            name:'Mango Drink',
            category:'drink',
            price:200,
            image:Mango
        },
        {
            id:3,
            name:'StrawBerry Mix',
            category:'cap',
            price:200,
            image:StrawberryPowder
        },
        {
            id:4,
            name:'Mango Mix',
            category:'cap',
            price:200,
            image:Mango_powder
        },
        {
            id:5,
            name:'BlueBerry Mix',
            category:'cap',
            price:200,
            image:BlueBerryPowder
        },
    ]
    
    return <ItemContext.Provider value={{items}}>
        {children}
    </ItemContext.Provider>
}
/*Important
Photo by Hemin Suthar: https://www.pexels.com/photo/sheikh-zayed-grand-mosque-in-abu-dhabi-4727408/
Photo by Mohamad Tamer: https://www.pexels.com/photo/photo-of-a-white-muslim-mosque-2406731/
*/ 
export default ItemContext