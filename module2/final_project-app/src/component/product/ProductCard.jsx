import {FaHeart, FaRegHeart } from 'react-icons/fa'

const ProductCard = ({product, isFavorite, onToggleFavorite}) => {

    return( <div className = "product-card"> 
        <div style={{
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px'
        }}>
            <div>
                <img src={product.image} alt={product.name} width={200} />
            </div> 
            
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString()}đ</p>
            <button onClick={()=> onToggleFavorite(product.id)}>{isFavorite ? <FaHeart color="red"/>: <FaRegHeart/>}</button>
        </div>
    </div>
    )
};

export default ProductCard;