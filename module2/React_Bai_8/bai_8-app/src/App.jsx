import { useReducer, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import {Typography, Button} from '@mui/material';
import {React, memo, useCallback  } from 'react';
import './App.css'

// const cartReducer = (currenState, action) => {
//   switch (action.type) {
//     case "Add_to_cart":
//       return currenState
//     case "Add_qualtity":
//       return currenState
//     case "remove":
//       return currenState
//     default:
//       return currenState
//   }
// }


// const PRODUCTS = [
//   {
//     id: 1,
//     name: "Laptop",
//     price: 500
//   },
//   {
//     id: 2,
//     name: "Cellphone",
//     price: 100
//   }
// ]

const AddToCartButton = memo(({ onAdd }) => {
  console.log("Nut tham vao gio hang render");
  return <Button onClick={onAdd}>Them vao gio hang</Button>
});

function App() {
  const [count, setCount] = useState(0);

  const handleAdd = useCallback(() => {
    console.log("Da them vao gio hang")
  },[]);

  return (
    <div>
      <Typography>So luot xem trang {count} </Typography>
      <Button onClick={()=> setCount(count+1)}>Tang luot xem</Button>
      <AddToCartButton onAdd={handleAdd} />

    </div>
  )
}

export default App
