import { AppBar, Bagde, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import App from "../../App";
import { Link } from "react-router-dom";


type Props = {
    search: string,
    setSearch: (value: string) => void;
}

const Header = ({ search, setSearch }: Props) => {
    const { totalItems } = useCart();

    return (
        <AppBar position="sticky" elevation={0}>
            <Container maxWidth="xl">
                <Toolbar sx={{
                    display: "flex",
                    alignItems:"center",
                    gap:2
                }}>
                    <Typography
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: 800,
                            whiteSpace: "nowrap",
                        }}
                    >
                        Tech Shop
                    </Typography>
                    <Box>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}