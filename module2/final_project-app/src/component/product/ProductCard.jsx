import {FaHeart, FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
const ProductCard = ({product, isFavorite, onToggleFavorite}) => {

    return( <div className = "product-card"> 
        <div style={{
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px'
        }}>
            <Link to={`/product/${product.id}`} style={{textDecoration: "none", color: "inherit"}} >
                <img src={product.image} alt={product.name} width={200} style={{borderRadius: 4}}/>
                <h3>{product.name}</h3>
                <p>{product.price.toLocaleString()}đ</p>
            </Link>
  
            <button onClick={()=> onToggleFavorite(product.id)}>{isFavorite ? <FaHeart color="red"/>: <FaRegHeart/>}</button>
        </div>
    </div>
    )
};

export default ProductCard;