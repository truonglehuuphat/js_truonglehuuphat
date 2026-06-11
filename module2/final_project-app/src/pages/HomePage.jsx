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

const parsePrice = (priceStr) => {
  return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
};

const HomePage = () => {
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [sortType, setSortType] = useState("defaut");

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

    console.log(" priceRange: "+ priceRange);
    console.log(" searchText "+ searchText);
    console.log(" sortType: "+ sortType);

    const filteredProducts = products.filter((product) => 
        product.name.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((product)=>{
        const productPrice = product.price;
        if( priceRange === "under10") return product.price < 10000000;
        if( priceRange === "10to20") return product.price >= 10000000 && product.price <= 20000000;
        if( priceRange === "over20") return product.price > 20000000;
        return true;
    })
    .sort((a,b)=> {
        if(sortType === "priceASC") return (a.price) - (b.price);
        if(sortType === "priceDESC") return (b.price) - (a.price);
        if(sortType === "nameAz") return a.name.localeCompare(b.name);
        return 0;
    });

    return (
        <div>
        <div style={{ display: 'flex', gap: '20px' }}>
        <h2>CSC Shop</h2>
        
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <h2>Fast shipping, curated products, and a floral-themed modern shopping experience</h2>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <SearchBar value={searchText} onChange={setSearchText} />
        </div>
        <div>
            <FilterBar priceRange={priceRange} onPriceChange={setPriceRange} sort={sortType} onSortChange={setSortType} />
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
            <p>Yêu thích: {favoriteIds.length} | san pham dang co {products.length}
             </p>
        </div> 
        <div className="product-list" style={{ display: 'flex', gap: '20px' }}>
            { products.length === 0 ? (
                <p>Không có sản phẩm nào.</p>
            ) : (
                filteredProducts.length > 0 ? 
                filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} isFavorite={favoriteIds.includes(product.id)} onToggleFavorite={handleToggleFavorite} /> 
                )) : (<p>Khong tim thay san pham nao</p>) 
                )
            }
        </div>
    </div>
    );
};

export default HomePage