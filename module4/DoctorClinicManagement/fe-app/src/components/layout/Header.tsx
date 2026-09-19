import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useUser } from "../../context/UserProvider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const Header = () => {
  const { user, logout } = useUser();
  // Kiểm tra người dùng đã đăng nhập chưa
  const isAuthenticated = Boolean(user && user.name && user.name.trim().length > 0);

  const navigate = useNavigate(); // 👈 2. Khởi tạo hàm navigate
  const handleLogout = ()=> {
    logout();
    navigate("/");
  }
  return (
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

          <IconButton component={Link} to="#" color="inherit">
            <HeadsetMicOutlinedIcon /> Tư vấn khám bệnh
          </IconButton>
          {/* RIGHT - ACTIONS (FIX HERE) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              marginLeft: "auto", // 🔥 KEY FIX
            }}
          >

            {isAuthenticated ? (
              /* Đã đăng nhập -> Hiển thị tên & nút Đăng xuất */
              <>
                <Button
                  component={Link}
                  to="/patient"
                  color="inherit"
                  startIcon={<AccountCircleIcon />}
                  sx={{ textTransform: "none", fontWeight: 600 }}
                >
                  {user.name}
                </Button>

                <IconButton
                  color="inherit"
                  onClick={handleLogout}
                  title="Đăng xuất"
                  size="small"
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              /* Chưa đăng nhập -> Hiển thị Đăng nhập & Đăng ký */
              <>
                <Button
                  component={Link}
                  to="/login"
                  color="inherit"
                  startIcon={<PermIdentityOutlinedIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Đăng nhập
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="outlined"
                  color="inherit"
                  startIcon={<PermIdentityOutlinedIcon />}
                  sx={{ textTransform: "none", borderRadius: 2 }}
                >
                  Đăng ký
                </Button>
              </>
            )}

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
};

export default Header;
