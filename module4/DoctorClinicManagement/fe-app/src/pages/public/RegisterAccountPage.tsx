import { Controller, useForm } from "react-hook-form";
import type { CheckoutFormData } from "../../schemas/checkoutSchema";
import { useState } from "react";
import React from "react";
import {
    Box, Button, Container, FormControl, Grid, InputLabel, MenuItem,
    Paper, Select, TextField, ToggleButton, ToggleButtonGroup, Typography
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { checkoutRegister, type CheckoutRegister } from "../../schemas/checkoutRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link } from "react-router-dom";

const RegisterAccountPage = () => {
    const {
        register,
        control,
        handleSubmit,
        formState: { errors }, // ✅ RESTORE ERRORS
        reset,
        resetField,
    } = useForm<CheckoutRegister>({
        resolver: yupResolver(checkoutRegister),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            password1: "",
            password2: "",
        },
    });
    const [success, setSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [alignment, setAlignment] = React.useState('web');
    const [alignment2, setAlignment2] = React.useState('web');
    const onSubmit = async (formData: CheckoutFormData) => {
    }

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const handleChange2 = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment2(newAlignment);
    };
    return (
        <Container>
            {/* LEFT FORM */}
            <Grid container spacing={1}>
                <Grid >
                    <Paper sx={{ p: 3, borderRadius: 3 }} variant="outlined">
                        <Typography variant="h4" sx={{ fontWeight: 700, mb: 3 }}>
                            Đăng ký Tài khoản
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                {/* NAME */}
                                <Grid size={{ xs: 12}}>
                                    <TextField
                                        fullWidth
                                        label="Tên đăng nhập"
                                        {...register("name")}
                                        error={!!errors.name}
                                        helperText={errors.name?.message} />
                                </Grid>
                                {/* EMAIL */}
                                <Grid size={{ xs: 12}}>
                                    <TextField
                                        fullWidth label="Email"
                                        {...register("email")}
                                        error={!!errors.email}
                                        helperText={errors.email?.message} />
                                </Grid>
                                {/* PASSWORD */}
                                <Grid size={{ xs: 12}}>
                                    <TextField
                                        fullWidth
                                        label="PASSWORD 1"
                                        {...register("password1")}
                                        error={!!errors.password1}
                                        helperText={errors.password1?.message}
                                    />
                                </Grid>
                                {/* PASSWORD */}
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        fullWidth
                                        label="PASSWORD 2"
                                        {...register("password2")}
                                        error={!!errors.password2}
                                        helperText={errors.password2?.message}
                                    />
                                </Grid>

                            </Grid>

                            <Button type="submit" variant="contained" fullWidth sx={{ mt: 3 }} disabled={submitting} >
                                {submitting ? "Tiếp theo..." : "Tiếp theo"}
                            </Button>
                          
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default RegisterAccountPage;