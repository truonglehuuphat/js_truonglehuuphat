import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const Header = () => (
  <AppBar position="sticky" elevation={0}>
    <Container maxWidth="xl">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* LEFT - LOGO */}
        <Typography
          component={Link}
          to="/"
          variant="h5"
          sx={{
            textDecoration: "none",
            color: "inherit",
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          <h2>CSC Hopital</h2>
        </Typography>
        {/* RIGHT - ACTIONS (FIX HERE) */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginLeft: "auto", // 🔥 KEY FIX
          }}
        >

          <IconButton component={Link} to="login" color="inherit">
            <PermIdentityOutlinedIcon /> Dành cho khách hàng
          </IconButton>
          <IconButton component={Link} to="#" color="inherit">
            <HeadsetMicOutlinedIcon /> Hỏi đáp
          </IconButton>
          <IconButton component={Link} to="login" color="inherit">
            <PermIdentityOutlinedIcon /> Dành cho nhân viên
          </IconButton>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
