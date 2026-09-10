import { Box, Card, CardContent, Typography } from "@mui/material";
import type { UserInfo } from "../../types/user";


const ProfileCard = ({ userInfo }: { userInfo: UserInfo } )=> {
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
            <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                {/* TITLE */}
                <Typography
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
                >Tên: {userInfo.name}</Typography>
            </CardContent>
        </Card>
    )
};

export default ProfileCard;