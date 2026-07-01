// import { products } from "../data/products.js"
import ProductCard from "../component/product/ProductCard.jsx"
import { useEffect, useState, useContext } from 'react'
import SearchBar from "../component/SearchBar.jsx";
import FilterBar from "../component/FilterBar.jsx";
import { ProductService, getProducts, getProductById } from "../sevices/productService.js"
import { Container, Grid, TextField, FormControl, Typography, Box } from "@mui/material";
import { CartContext } from "../context/CartContext";

const HomePage = () => {
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [search, setSearch] = useState("");
    const [Error, setError] = useState("");
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState("all");
    const [sortType, setSortType] = useState("defaut");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    const { dispatch, cartItems } = useContext(CartContext);
    console.log("cartItems: ", cartItems);
    const handleToggleFavorite = (id) => {
        setFavoriteIds((prev) => prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]);
    };

    useEffect(() => {
        const loadProduct = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await ProductService.getAll();

                setProducts(response.data);
            } catch {
                setError("Khong the tai san pham, vui long thu lai");
                console.log(Error)
                alert("Khong the tai san pham, vui long thu lai")
            } finally {
                setLoading(false);
            }
        };
        loadProduct()
    }, []);

    useEffect(() => {
        const priceMap = {
            under10: { minPrice: "", maxPrice: 10 },
            "10to20": { minPrice: "", maxPrice: 10 },
            over20: { minPrice: 20, maxPrice: "" },
        };
        const sortMap = {
            priceAsc: { sortBy: "price", order: "asc" },
            priceDesc: { sortBy: "price", order: "desc" },
        };
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");
                const response = await getProducts({
                    search,
                    category,
                    ...(priceMap[priceRange] ?? {}),
                    ...(sortMap[sortType] ?? {}),
                });
                const data = response?.data ? response.data : response;
                setProducts(data)
            } catch {
                setError("Khong the tai san pham. Vui long thu lai");
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [search, category, priceRange, sortType]);


    return (
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
                <Typography>Yêu thích: {favoriteIds.length} | sản phẩm đang có {products.length}
                </Typography>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} rowSpacing={1} column={{ xs: 4, sm: 8, md: 12 }}>
                    {products.length === 0 ? (
                        <Typography>Không có sản phẩm nào {Error}</Typography>
                    ) : (
                        products.length > 0 ?
                            products.map((product, index) => (
                                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
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