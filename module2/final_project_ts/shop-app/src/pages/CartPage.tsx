import { Container, Grid, Box, Typography } from "@mui/material";
import CardItem from "../components/cart/CartItem";
import CardSummary from "../components/cart/CardSummary";
import BackButton from "../components/common/BackButton";
import { useCart } from "../context/CartProvider";

const CartPage = () => {
    const { cartItems, totalPrice } = useCart();
    console.log(cartItems)
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
            <Box sx={{ md: 2.5 }}>
                <BackButton />
            </Box>
            <Typography variant="h4" sx={{
                fontWeight: 700,
                marginBottom: { xs: 2.5, md: 4 }
            }}>
                Shopping Cart
            </Typography>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>{
                    cartItems.map((item) =>
                        <CardItem key={item.id} item={item} />
                    )}

                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <CardSummary totalPrice={totalPrice}/>
                </Grid>
            </Grid>
        </Container>

    );
}
export default CartPage;