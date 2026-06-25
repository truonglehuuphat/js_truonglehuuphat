import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

const cartReducer = (currenState, action) => {
  switch (action.type) {
    case "Add_to_cart":
      return currenState
    case "Add_qualtity":
      return currenState
    case "remove":
      return currenState
    default:
      return currenState
  }
}


const PRODUCTS = [
  {
    id: 1,
    name: "Laptop",
    price: 500
  },
  {
    id: 2,
    name: "Cellphone",
    price: 100
  }
]

function App() {
  const [count, dispatch] = useReducer(cartReducer, [])

  return (
    <div>
      {PRODUCTS.map((item) => (
        <p>{item.name}</p>
        <p>{item.price}</p>
           <button onClick={()=> {
        dispatch({type: "Add_to_cart"})}> Add to cart </button>
      <button onClick={()=> {dispatch:({type: "muiltiple_two"})}> Remove </button>
      ))}

    </div>
  )
}

export default App
