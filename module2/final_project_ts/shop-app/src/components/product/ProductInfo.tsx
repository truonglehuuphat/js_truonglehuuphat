import { Box, Typography, Rating, Button } from "@mui/material";
import type { Product } from "../../types";
import { useCart } from "../../context/CartProvider";

type Props = {
    product: Product;
}

const ProductInfo = ({ product }: Props) => {
    const { dispatch } = useCart();

    return (
        <Box>
            <Typography variant="h4">
                {product.title}
            </Typography>
            <Rating value={product.rating} readOnly />
            <Typography variant="h4" sx={{ color: "second.main" }}>
                {product.price.toLocaleString()}
            </Typography>
            <Typography>
                {product.brand}
            </Typography>
            <Typography sx={{ mt: 3 }}>
                {product.description}
            </Typography>
            <Button variant="contained" onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
                Add to Cart
            </Button>
        </Box>
    )
}

export default ProductInfo