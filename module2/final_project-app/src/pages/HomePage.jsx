import {products} from "../data/products.js"
import ProductCard from "../component/product/ProductCard.jsx"
import { useState } from 'react'

const HomePage = () => {
    const [favoriteIds, setFavoriteIds] = useState([]);

    const handleToggleFavorite = (id) => {
        setFavoriteIds((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...pre, id]);
    };

    return <div>
        <h2>Danh sách sản phẩm</h2>
        <div className="product-list" style={{ display: 'flex', gap: '20px' }}>
            { products.length === 0 ? (
                <p>Không có sản phẩm nào.</p>
            ) : (
                products.map((item) => ( <ProductCard key={item.id} product={item} /> ))
            )}
        </div>
    </div>
};

export default HomePage