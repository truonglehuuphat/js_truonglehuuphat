import { Grid } from "@mui/material";
import MenuPage from "./MenuPage";
import RegisterPage from "./RegisterPage";


const HomePage = () => {
    return (
        <>
            <Grid
                container
                spacing={0}
                sx={{
                    minHeight: '100vh',
                    justifyContent: "center", // Canh giữa theo chiều ngang
                    alignItems: "center"     // Canh giữa theo chiều dọc
                }} // Thêm dòng này nếu muốn căn giữa toàn màn hình
            >
                <Grid size={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <RegisterPage />
                </Grid>
                <Grid size={4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <MenuPage />
                </Grid>
            </Grid>
        </>
    )
}

export default HomePage;