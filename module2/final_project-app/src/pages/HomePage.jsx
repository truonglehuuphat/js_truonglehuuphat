// import { products } from "../data/products.js"
import ProductCard from "../component/product/ProductCard.jsx"
import { useEffect, useState } from 'react'
import SearchBar from "../component/SearchBar.jsx";
import FilterBar from "../component/FilterBar.jsx";
import {ProductService , getProducts , getProductById}  from "../sevices/productService.js"
import { Container, Grid, TextField, FormControl, Typography, Box } from "@mui/material";



export const fetchProducts = () => {
    console.log(" fetchProducts function ");
    return new Promise(() => {
        setTimeout(() => ProductService.getAll(), 800);
    });
}

const parsePrice = (priceStr) => {
    return parseInt(priceStr.replace(/[^0-9]/g, ""), 10);
};

const HomePage = () => {
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [search, setSearch] = useState("");
    const [Error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [sortType, setSortType] = useState("defaut");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    
    const handleToggleFavorite = (id) => {
        setFavoriteIds((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
    };


    useEffect(() => {
        const loadProduct = async () => {
            try {
                //  console.log(" loadProduct: ");
                setLoading(true);
                setError("");
                const response = await ProductService.getAll();
                // console.log(" data: " + response.data);
                setProducts(response.data);
            } catch {
                setError("Khong the tai san pham, vui long thu lai");
                console.log(error)
                alert("Khong the tai san pham, vui long thu lai")
            } finally {
                setLoading(false);
            }
        };
        loadProduct()
    }, []);
    // console.log(" products: " + products);

    useEffect(()=> {
        const priceMap = {
            under10: {minPrice: "", maxPrice: 10},
            "10to20": {minPrice: "", maxPrice: 10},
            over20: {minPrice: 20, maxPrice: ""},
        };
        const sortMap = {
            priceAsc: {sortBy: "price", order: "asc"},
            priceDesc: {sortBy: "price", order: "desc"},
        };
        const fetchProducts = async ()=>{
            try {
                setLoading(true);
                setError("");
                const response = await getProducts({
                    search,
                    category,
                    ...(priceMap[priceRange] ?? {}),
                    ...(sortMap[sort] ?? {}),
                });
                console.log("78 data: " + response.data);
                setProducts(response.data)
            } catch {
                setError("Khong the tai san pham. Vui long thu lai");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    },[search, category, priceRange, sortType]);
    
//    const filteredProducts = products.filter((product) => 
//         product.name.toLowerCase().includes(searchText.toLowerCase())
//     )
//     .filter((product)=>{
//         const productPrice = product.price;
//         if( priceRange === "under10") return product.price < 10000000;
//         if( priceRange === "10to20") return product.price >= 10000000 && product.price <= 20000000;
//         if( priceRange === "over20") return product.price > 20000000;
//         return true;
//     })
//     .sort((a,b)=> {
//         if(sortType === "priceASC") return (a.price) - (b.price);
//         if(sortType === "priceDESC") return (b.price) - (a.price);
//         if(sortType === "nameAz") return a.name.localeCompare(b.name);
//         return 0;
//     });

    return (
        // <div>
        //     <div style={{ display: 'flex', gap: '20px' }}>
        //         <h2>CSC Shop</h2>
        //     </div>
        //     <div style={{ display: 'flex', gap: '20px' }}>
        //         <h2>Fast shipping, curated products, and a floral-themed modern shopping experience</h2>
        //     </div>
        //     <div style={{ display: 'flex', gap: '20px' }}>
        //         <SearchBar value={searchText} onChange={setSearchText} />
        //     </div>
        //     <div>
        //         <FilterBar priceRange={priceRange} onPriceChange={setPriceRange} sort={sortType} onSortChange={setSortType} />
        //     </div>
        //     <div style={{ display: 'flex', gap: '20px' }}>
        //         <p>Yêu thích: {favoriteIds.length} | san pham dang co {products.length}
        //         </p>
        //     </div>
        //     <div className="product-list" style={{ display: 'flex', gap: '20px' }}>
        //         {products.length === 0 ? (
        //             <p>Không có sản phẩm nào.</p>
        //         ) : (
        //             filteredProducts.length > 0 ?
        //                 filteredProducts.map((product) => (
        //                     <ProductCard key={product.id} product={product} isFavorite={favoriteIds.includes(product.id)} onToggleFavorite={handleToggleFavorite} />
        //                 )) : (<p>Khong tim thay san pham nao</p>)
        //         )
        //         }
        //     </div>
        // </div>
        // <Container maxWidth="md">
        <>
            <Box sx={{ bgcolor: 'blue', color: 'white', textAlign: 'left', width: '100%', borderRadius: 1, p: 2 }} spacing={2} >
                <Typography variant="h4" gutterBottom>
                    CSC Tech Shop
                </Typography>
                <Typography variant="p" gutterBottom >
                    Premium gadgets and tech accessories for developers
                </Typography>
            </Box>

            <Box>
                <FilterBar priceRange={priceRange} onPriceChange={setPriceRange} sort={sortType} onSortChange={setSortType} />
            </Box>

            <Box>
                <Typography>Yêu thích: {favoriteIds.length} | san  dang co {products.length}
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={1} column={{ xs: 4, sm: 8, md: 12 }}>
                    {products.length === 0 ? (
                        <Typography>Không có sản phẩm nào {Error}</Typography>
                    ) : (
                        products.length > 0 ?
                            products.map((product, index) => (
                                <Grid   size={{ xs: 12, sm: 6, md: 4, lg: 3}} key={product.id}>    
                                    <ProductCard key={product.id} product={product} isFavorite={favoriteIds.includes(product.id)} onToggleFavorite={handleToggleFavorite} />
                                </Grid>
                            ))
                            : (<Typography>Khong tim thay san pham nao</Typography>)
                    )
                    }
                </Grid>
            </Box>
        </>
        // </Container>
    );
};

export default HomePage