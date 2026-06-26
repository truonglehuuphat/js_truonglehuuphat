import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { Card, CardMedia, CardContent, Button, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';

const ProductCard = ({ product, isFavorite, onToggleFavorite }) => {

    const {dispatch} = useContext(CartContext);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: product
        });
    };
    
    return (
        <Card sx={{ maxWidth: 350 }}>
            <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }} >
                <CardMedia 
                    component="img"
                    sx={{  objectFit: 'contain'  }}
                    image={product.image}
                    title={product.name}
                    height="250"
                />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {product.name}
                    </Typography>
                    <Typography color="text.secondary">
                        {product.price}
                    </Typography>
                </CardContent>
            </Link>

            <CardActions>
                <Button onClick={handleAddToCart}>
                    Add to cart
                </Button>
                <Button onClick={() => onToggleFavorite(product.id)}>
                    {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
                </Button>
            </CardActions>
        </Card>
    )
};

export default ProductCard;