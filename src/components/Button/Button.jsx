import './Button.css'

const Button = ({children,kind,handleClick})=>{
    return <button className={kind?kind:'primary'} onClick={handleClick}>{children}</button>
}

export default Button