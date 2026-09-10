import { Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import type { Department } from "../../types/specialty";
import { useEffect } from "react";

const FindDoctorPage = () => {
    const [doctors, setDoctors] = useState<DoctorInfo[] | null>(null);
    const [deparment, setDeparment] = useState<Department[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                setError("");

                const [department, doctors] = await Promise.all([
                    getDepartment({ signal: controller.signal }),
                    getAllDoctors({
                        speciality: debouncedSearch,
                        signal: controller.signal,
                    }),
                ]);

                setCategories(categoriesRes);
                setProducts((productsRes as ProductResponse).products);
            } catch (err: any) {
                if (err?.name === "CanceledError" || err?.code === "ERR_CANCELED") {
                    return;
                }
                setError("Cannot load products right now. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [deparment, doctors]);

    return (
        <Container>
            <Grid container spacing={1}>
                <Grid >
                    {/* Chọn chuyên khoa */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            control={control}
                            name="department"
                            render={({ field }) => (
                                <FormControl fullWidth >
                                    <InputLabel>Chọn chuyên khoa</InputLabel>
                                    <Select label="Chọn chuyên khoa" {...field}>
                                        {department.map((w) => (
                                            <MenuItem key={w.code} value={String(w.code)}>
                                                {w.name}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                    <Typography variant="caption" color="error">
                                        {errors.department?.message}
                                    </Typography>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    {/* Chọn chuyên Bac si */}
                    <Grid size={{ xs: 12 }}>
                        <Controller
                            control={control}
                            name="department"
                            render={({ field }) => (
                                <FormControl fullWidth >
                                    <InputLabel>Chọn chuyên khoa</InputLabel>
                                    <Select label="Chọn chuyên khoa" {...field}>
                                        {doctor.map((w) => (
                                            <MenuItem key={w.code} value={String(w.code)}>
                                                {w.name}
                                            </MenuItem>
                                        ))}
                                    </Select>


                                    <Typography variant="caption" color="error">
                                        {errors.doctor?.message}
                                    </Typography>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid>
                        <Typography variant="h7" color="secondary.main" fontWeight={800} mt={1}>
                            {/* {doctorInfo.description} */}
                            "Thông tin bác sĩ"
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default FindDoctorPage;