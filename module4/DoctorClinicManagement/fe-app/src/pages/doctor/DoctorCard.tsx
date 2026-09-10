import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { DoctorInfo } from "../../types/doctor";
import { Link } from "react-router-dom";

const DoctorCard = ({ doctorInfo }: { doctorInfo: DoctorInfo }) => {

    const handleAddToCart = () => {

    };
    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: 3,
                border: "1px solid",
                borderColor: "divider",
                transition: "0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 4,
                },
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* IMAGE */}
            <Box component={Link} to={`/doctor/${doctorInfo.id}`} sx={{ display: "block" }}>
                {/* <CardMedia component="img" image={doctorInfo.thumbnail} sx={{ height: 200, objectFit: "contain", p: 2 }} /> */}
            </Box>

            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* TITLE */}
                <Typography
                    component={Link}
                    to={`/doctor/${doctorInfo.id}`}
                    sx={{
                        textDecoration: "none",
                        color: "text.primary",
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        minHeight: 48,
                    }}
                >{doctorInfo.title} {doctorInfo.name}</Typography>
                {/* Vị trí */}
                <Typography variant="h6" color="secondary.main" fontWeight={800} mt={1}>
                    {doctorInfo.position}
                </Typography>
                <Typography variant="h7" color="secondary.main" fontWeight={800} mt={1}>
                    {doctorInfo.description}
                </Typography>
                {/* ACTIONS */}
                <Box
                    sx={{
                        mt: "auto",
                        display: "flex",
                        alignItems: "center",
                        pt: 2,
                    }}
                >
                    <Button variant="contained" size="small" onClick={handleAddToCart}>
                        Đặt lịch khám
                    </Button>
                </Box>
            </CardContent>
        </Card>
    )
}

export default DoctorCard;