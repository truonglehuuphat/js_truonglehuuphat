import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [products, setProducts] = useState([])
  useEffect(()=>{
    const fetchProducts = async () =>{
      const raw = await fetch('https://dummyjson.com/products')
      const result = await raw.json()

      console.log("result ", result)
      setProducts(result.products);
    }

    fetchProducts()

  },[])

  return (
    <>{products.map((item) => {
          return <div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <img src="{item.thumbnail}" alt="" />
            </div>
        })}
    </>
  )
}

export default App
