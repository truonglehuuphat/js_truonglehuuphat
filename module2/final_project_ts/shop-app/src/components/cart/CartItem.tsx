import { Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Typography } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

import type { CartItem as CartItemType } from "../../types/cart";
import { useCart } from "../../context/CartProvider";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { dispatch } = useCart();

    return (
        <Card
            sx={{
                border: "1px solid",
                borderRadius: 3,
                borderColor: "divider",
                mt: 1.8,
                display: "flex"
            }}
        >
            <CardMedia component="img" image={item?.thumbnail} sx={{ width: { xs: 104, md: 140 }, objectFit: "contain", p: 1.5 }} />
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <Typography fontWeight={700}>
                    {item?.title}
                </Typography>
                <Typography color="secondary" mt={1}>
                    ${Number(item?.price).toLocaleString()}
                </Typography>
                <Stack direction="row" spacing={1} mt={1.5} sx={{alignItems:"center"}}  >
                    <Button variant="outlined" size="small" sx={{ minWidth: 36 }}
                        onClick={() =>
                            dispatch({
                                type: "DECREASE_QUANTITY",
                                payload: item.id
                            })
                        }
                    >
                        -
                    </Button>
                    <Typography>
                        {item?.quantity}
                    </Typography>
                    <Button variant="outlined" size="small" sx={{ minWidth: 36 }}
                        onClick={() =>
                            dispatch({
                                type: "INCREASE_QUANTITY",
                                payload: item.id
                            })
                        }
                    >
                        +
                    </Button>
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                    <Box sx={{ ml: "auto", display: "flex", alignItems: "center" }}>
                        <Typography sx={{fontWeight:700}}>
                            {Number(item?.quantity * item?.price).toFixed(2)}
                        </Typography>
                    </Box>

                </Stack>
            </CardContent>
        </Card>
    )
}

export default CartItem;