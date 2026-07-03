import { Box, Button, Card, CardContent, CardMedia, IconButton, Rating, Snackbar, Typography, Alert, Stack } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Product } from "../../types";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartProvider";

const ProductCard = ({ product }: { product: Product }) => {
    const { dispatch, cartItems, isInWishlist, toggleWishlist } = useCart();

    const isWishlisted = isInWishlist(product.id);
    const itemInCart = cartItems.find((item) => item.id === product.id);
    const currentQuantity = itemInCart?.quantity ?? 0;

    const [toastOpen, setToastOpen] = useState(false);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product,
        });
        setToastOpen(true);
    }

    return (
        <>
            <Card sx={{
                height: "100%",
                borderRadius: 3,
                boder: "1px solid",
                borderColor: "divider",
                transition: "0.2s",
                "&:hover": {
                    transform: "transform(-4px)",
                    boxShadow: 4,
                },
                display: "flex",
                flexDirection: "column",
            }}
            >
                <Box component={Link} to={`/product/${product.id}`} sx={{ display: "block" }}>
                    <CardMedia component="img" image={product.thumbnail} sx={{ height: 200, objectfit: "contain", p: 2 }} />
                </Box>
                <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {/* Thông tin sản phẩm */}
                    <Typography
                        component={Link}
                        to={`/product/${product.id}`}
                        sx={{
                            textDecoration: "none",
                            color: "text.primary",
                            fontWeight: 600,
                            display: "-webkit-box",
                            webkitlineClamp: 2,
                            webkitBoxOrient: "Vertical",
                            overflow: "hidden",
                            minHeight: 48,
                        }}>
                        {product.title}
                    </Typography>
                    {/* Rating */}
                    <Stack sx={{ direction: "row", alignItems: "center", spacing: 1, mt: 1 }}>
                        <Rating value={product.rating} precision={0.5} readOnly size="small" />
                        <Typography variant="caption" color="text.secondary">
                            ({product.ratingCount})
                        </Typography>
                    </Stack>
                    {/* Price */}
                    <Typography sx={{ variant: "h6", color: "secondary.main", fontWeight: 800, mt: 1 }}>
                        ${Number(product.price).toLocaleString()}
                    </Typography>
                    {/* ACTION */}
                    <Box
                        sx={{
                            mt: "auto",
                            display: "flex",
                            alignItems: "center",
                            pt: 2
                        }}
                    >
                            <Button variant="contained" size="small" onClick={handleAddToCart}>
                                {/* {currentQuantity > 0 ? `In Cart (${currentQuantity})` : "Add to Cart"} */}
                                Add to Cart
                            </Button>
                        {/* <IconButton color={ isWishlisted ?"error" : "default"} onClick={() => toggleWishlist(product.id)} > */}
                        <IconButton>
                        {/* { isWishlisted ?  <FavoriteIcon /> : <FavoriteBorderIcon /> } */}
                        <FavoriteIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card >
      {/* TOAST */}
      <Snackbar open={toastOpen} autoHideDuration={1500} onClose={() => setToastOpen(false)}>
        <Alert severity="success">Added to cart</Alert>
      </Snackbar>        
        </>
    )
}

export default ProductCard;