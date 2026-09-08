import { Box, Button, Typography } from "@mui/material";
import type { DoctorInfo } from "../../types/doctor";

const DoctorInfo= ( doctorInfo : DoctorInfo) => {
    return (
        <Box>
            <Typography variant="h4">{doctorInfo.title} {doctorInfo.name}</Typography>
            
            <Typography variant="h4" color="secondary.main">
                ${doctorInfo.position}
            </Typography>
            <Typography>
                ${doctorInfo.description}
            </Typography>
            <Button>
                Đặt lịch khám
            </Button>
        </Box>
    )
}

export default DoctorInfo;