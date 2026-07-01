import { useNavigate, useParams } from "react-router-dom";
import { Container, Box, Grid, Typography, Button, Rating } from "@mui/material";
import { getProductById } from "../sevices/productService";
import { useEffect, useState, useContext} from 'react'
import { CartContext } from '../context/CartContext';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [Error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [productCurrent, setProductCurrent] = useState([]);
    const {dispatch} = useContext(CartContext);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: productCurrent
        });
    };
    console.log(productCurrent);
    useEffect(() => {
        const fetchProduct = async () =>{
            try{
                setLoading(true);
                setError("");
                const response = await getProductById(id);
                setProductCurrent(response.data);
            } catch {
                setError("Không thể tải thông tin sản phẩm");
            } finally {
                setLoading(false);
            }
        };
        fetchProduct()
    }, [id])

    if (!productCurrent) {
        return <Box >
            <Button onClick={() => navigate(-1)}>Back</Button>
            <Typography>Không tìm thấy sản phẩm này!</Typography>
        </Box>
    }
    return <>
        <Container>
            <Grid container spacing={2}>
                <Grid container size={2}>
                    <Button variant="outlined" onClick={() => navigate(-1)}> Back </Button>
                </Grid>
                <Grid container size={10}>
                    <Typography  variant="h5" style={{ textAlign:'left'}}>{productCurrent.title}</Typography >
                </Grid>
            </Grid>
        </Container>
        
        <Container maxWidth="sm">
            <Grid container spacing={2}>
                <Grid container size={6}>
                    <Box>
                        <img src={productCurrent.image} alt={productCurrent.title} width={200} style={{ borderRadius: 4 }} />
                    </Box>
                </Grid>
                <Grid container size={6}>
                    <Box>
                        <Typography variant="h4" style={{color:'red', textAlign:'left'}}>${productCurrent.price}</Typography >
                        <Typography  style={{ textAlign:'left'}}>{productCurrent.description}</Typography >
                        <Button variant= "contained" onClick={handleAddToCart}>Add to cart</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>

    </>
}

export default ProductDetailPage;