import './index.css'
import ProductCard from './components/ProductCard'
import { useDebugValue } from 'react'
// 1. Import tất cả các hình ảnh cần dùng
import iphone14 from './assets/iphone-14-128gb.png';
import MacBook16In from './assets/macbook-16in.jpg';
import AppleWatchSeries7 from './assets/Apple-Watch-Ultra-2.jpg';

const Header = (props) => {
  // console.log("props:", props);
  return <h1>Hello {props.name}, age: {props.age}</h1>
}

// const Product = (props) => {
//   // console.log("props:", props);
//   return (
//     <>
//       <h1>Tên sản phẩm {props.name}, Giá {props.price}k</h1>
//     </>
//   );
// }

function App(){

  const products = [
    {
      name: "Iphone 14 Pro max",
      price: 1000,
      image: iphone14
    },
    {
      name: "MacBook Pro 16 inch",
      price: 2500,
      image: MacBook16In
    },
    {
      name: "Apple Watch Series 7",
      price: 500,
      image: AppleWatchSeries7
    }
  ]
  

  return (
    <div className = "map-container">
      <div className="product-grid">
        {products.map((item) => 
            <ProductCard name={item.name} price={item.price} image={item.image} />
          )}
      </div>
    </div>
  )
}

export default App