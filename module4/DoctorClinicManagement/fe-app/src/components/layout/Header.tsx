import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useUser } from "../../context/UserProvider";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';

type Props = {
  search: string;
  setSearch: (value: string) => void;
};

const Header = () => {
  const { user, logout } = useUser();
  // Kiểm tra người dùng đã đăng nhập chưa
  const isAuthenticated = Boolean(user && user.name && user.name.trim().length > 0);
  const isRoleDoctor = user.role === "doctor";
  const isAdmin = user.role === "admin"
  const navigate = useNavigate(); // 👈 2. Khởi tạo hàm navigate
  const handleLogout = () => {
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

          {isRoleDoctor ? (
            <Box>
              <IconButton component={Link} to="#" color="inherit">
                <CalendarMonthIcon /> Lịch làm việc của tôi
              </IconButton>
              <IconButton component={Link} to="#" color="inherit">
                <BusinessCenterIcon /> Lịch hẹn của tôi
              </IconButton>
            </Box>
          ) : isAdmin ? (
            <Box>
              <IconButton component={Link} to="#" color="inherit">
                <BarChartIcon /> DashBoard
              </IconButton>
              <IconButton component={Link} to="#" color="inherit">
                <PeopleAltIcon /> Bác sĩ
              </IconButton>    
              <IconButton component={Link} to="#" color="inherit">
                <DashboardIcon /> Phòng ban
              </IconButton>          
              <IconButton component={Link} to="#" color="inherit">
                <CalendarMonthIcon /> Quản lý lịch hẹn
              </IconButton>                
            </Box>
          ) : (
            <Box>
              <IconButton component={Link} to="#" color="inherit">
                <HeadsetMicOutlinedIcon /> Tư vấn khám bệnh
              </IconButton>
              <IconButton component={Link} to="#" color="inherit">
                <BusinessCenterIcon /> Đặt lịch khám
              </IconButton>
            </Box>
          )}


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
    </AppBar >
  )
};

export default Header;
