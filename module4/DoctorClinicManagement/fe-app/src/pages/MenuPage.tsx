import { Box, Container, Grid, Paper, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import ForumIcon from '@mui/icons-material/Forum';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';
import GradingIcon from '@mui/icons-material/Grading';
import SpatialAudioOffIcon from '@mui/icons-material/SpatialAudioOff';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';

const MenuPage = () => {

    return (
        <Container>
            <Box  >
                <Typography variant="h4"
                    sx={{
                        // minHeight: '100vh',
                        justifyContent: "center", // Canh giữa theo chiều ngang
                        alignItems: "center"     // Canh giữa theo chiều dọc
                    }} // Thêm dòng này nếu muốn căn giữa toàn màn hình
                >
                    Bệnh Viện Đa Khoa CSC
                </Typography>
                <Typography
                    sx={{
                        // minHeight: '100vh',
                        justifyContent: "center", // Canh giữa theo chiều ngang
                        alignItems: "center"     // Canh giữa theo chiều dọc
                    }} // Thêm dòng này nếu muốn căn giữa toàn màn hình
                >
                    Uy tín - Chất lượng - Tận tâm
                </Typography>
                <Paper>
                    <Grid container
                        sx={{
                            alignItems: "center",     // Canh giữa theo chiều dọc
                        }}
                    >
                        <Grid size={6} sx={{ border: "1px solid" }} >
                            <Box component={Link} to="#" >
                                <SpatialAudioOffIcon sx={{ fontSize: 100 }} />
                                <Typography>Tư vấn khám bệnh</Typography>
                            </Box>

                        </Grid>
                        <Grid size={6} sx={{ border: "1px solid" }}>
                            <Box component={Link} to="#">
                                <LocalHospitalOutlinedIcon sx={{ fontSize: 100 }} />
                                <Typography>Chuyên gia - Bác sĩ</Typography>
                            </Box>

                        </Grid>
                        <Grid size={6} sx={{ border: "1px solid" }}>
                            <Box component={Link} to="#">
                                <GradingIcon sx={{ fontSize: 100 }} />

                            </Box>
                            <Typography>Tra cứu kết quả</Typography>
                        </Grid>
                        <Grid size={6} sx={{ border: "1px solid" }}>
                            <Box component={Link} to="#" sx={{ borderRadius: 20 }} >
                                <VerticalSplitIcon sx={{ fontSize: 100 }} />
                                <Typography>Bảng giá</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>


            </Box>
        </Container>
    )
}

export default MenuPage