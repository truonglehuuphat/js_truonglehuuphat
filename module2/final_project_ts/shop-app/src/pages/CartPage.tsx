import { Container, Grid, Box, Typography } from "@mui/material";
import CardItem from "../components/cart/CartItem";
import CardSummary from "../components/cart/CardSummary";
import BackButton from "../components/common/BackButton";

const CartPage = () => {
    return (
        <Container>
            <Box sx={{ md: 2.5 }}>
                <BackButton />
            </Box>
            <Typography variant= "h4" sx={{
                fontWeight: 700,
                marginBottom: {xs: 2.5 , md: 4}
            }}>
                Shopping Cart
            </Typography>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <CardItem />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <CardSummary />
                </Grid>
            </Grid>
        </Container>

    );
}
export default CartPage;