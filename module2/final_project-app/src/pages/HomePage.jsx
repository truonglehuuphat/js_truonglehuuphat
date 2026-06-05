import {products} from "../data/products.js"
import ProductCard from "../component/product/ProductCard.jsx"
import { useEffect, useState } from 'react'
import SearchBar from "../component/SearchBar.jsx";
import FilterBar from "../component/FilterBar.jsx";

    export const fetchProducts = () => {
        return new Promise(()=>{
            setTimeout(()=> resolve(productsData), 800);
        });
    }

const HomePage = () => {
    const [favoriteIds, setFavoriteIds] = useState([]);

    const handleToggleFavorite = (id) => {
        setFavoriteIds((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
    };

    useEffect(()=>{
        const loadProduct = async () =>{
            try{
                setLoading(true);
                setError("");
                const data = await fetchProducts();
                setProducts(data);
            } catch {
                setError("Khong the tai san pham, vui long thu lai");
            } finally {
                setLoading(false);
            }
        };

    },[]);

    return <div>
        <div style={{ display: 'flex', gap: '20px' }}>
        <h2>CSC Shop</h2>
        
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <h2>Fast shipping, curated products, and a floral-themed modern shopping experience</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <SearchBar />
        </div> 
        <div>
            <FilterBar />
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <p>Yêu thích: {favoriteIds.length} | san pham dang co {products.length}
             </p>
        </div> 
        <div className="product-list" style={{ display: 'flex', gap: '20px' }}>
            { products.length === 0 ? (
                <p>Không có sản phẩm nào.</p>
            ) : (
                products.map((item) => ( <ProductCard key={item.id} product={item} isFavorite={favoriteIds.includes(item.id)} onToggleFavorite={handleToggleFavorite} /> ))
            )}
        </div>
    </div>
};

export default HomePage