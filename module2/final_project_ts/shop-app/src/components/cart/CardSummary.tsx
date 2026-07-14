import { Box, Button, Card, CardContent, Typography } from "@mui/material";

import { Link } from "react-router-dom";

const CardSummary = ({ totalPrice }: { totalPrice: number }) => {
    return (
        <Card
        sx={{
            borderRadius:3,
            borderColor:"divider",
            border:"1px solid",
            position: {md:"sticky"},
            top: {md: 90}
        }}
        >
            <CardContent>
                <Typography variant="h6" sx={{fontWeight:700}}>
                    Order Summary
                </Typography>
                <Box sx={{justifyContent:"space-between", display:"flex", mt:'3'}}>
                    <Typography>
                        Total: 
                    </Typography>
                    <Typography sx={{fontWeight:700}}>
                        ${totalPrice?.toFixed(2)}
                    </Typography>
                </Box>
                <Button component={Link} to="/checkout" fullWidth variant="contained" sx={{ mt: 3 }}>
                    Proceed to Checkout
                </Button>
            </CardContent>
        </Card>
    )
}

export default CardSummary;