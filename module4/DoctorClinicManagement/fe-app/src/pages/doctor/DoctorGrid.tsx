import { Grid } from "@mui/material";
import type { DoctorInfo } from "../../types/doctor";
import DoctorCard from "./DoctorCard";

type Props = {
    doctorInfo: DoctorInfo[];
};

const DoctorGrid = ({ doctorInfo }: Props) => {
    return (
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
            {doctorInfo.map((doctor: DoctorInfo) => (
                <Grid key={doctor.id} size={{ xs: 12}}>
                    <DoctorCard doctorInfo={doctor} />
                </Grid>
            ))}
        </Grid>
    )
}

export default DoctorGrid;