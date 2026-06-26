import { Outlet, Link } from "react-router-dom";
import { AppBar, Toolbar, Container, Box, Typography, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchBar from "../SearchBar";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.5),
    },
    marginRight: theme.spacing(3),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

function SearchAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Link to="/">
                        <Button variant="contained" color="white" size="small">
                            CSC Shop
                        </Button>
                    </Link>

                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase placeholder="Search products, brands..." inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    <Box style={{ color: "#fff", textDecoration: "none", marginLeft: "auto" }}>
                        <ModeNightIcon />
                    </Box>
                    
                    <Link to="/cart" style={{ color: "#fff", textDecoration: "none", marginLeft: "auto" }}>
                        {/* <IconButton> */}
                        <ShoppingCartIcon />
                        {/* </IconButton> */}
                    </Link>
                </Toolbar>
            </AppBar>
        </Box >
    );
}

const MainLayout = () => (
    <div style={{ minHeight: '50vh', display: 'flex', flexDirection: "column" }}>
        <Box style={{ display: 'flex', gap: '20px' }}>
            <SearchAppBar />
        </Box>
        <main style={{ minHeight: 'calc(100vh - 120px)', padding: '20px' }}>
            <Outlet />
        </main>

        <footer style={{ background: "#333", color: "#fff", textAlign: "center", padding: "16px" }}>
            2026 CSC Shop
        </footer>
    </div>
);

export default MainLayout;