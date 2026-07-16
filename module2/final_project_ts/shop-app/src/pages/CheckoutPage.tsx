import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import BackButton from "../components/common/BackButton";
import type { CheckoutFormData } from "../schemas/checkoutSchema";
import { checkoutSchema } from "../schemas/checkoutSchema";
import { getProvinces, getWardsByProvince } from "../services/locationService";
import type { Province } from "../types/location";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import type { Ward } from "../types/checkout";
import type { CreateOrderPayLoad } from "../types/order";
import { createOrder } from "../services/orderService";
import { Controller, useForm, useWatch } from "react-hook-form";
import EmptyState from "../components/common/EmptyState";
import { yupResolver } from "@hookform/resolvers/yup";

const CheckoutPage = () => {
    const { register, control, handleSubmit, formState: { errors }, reset, resetField, watch } = useForm<CheckoutFormData>({
        resolver: yupResolver(checkoutSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            provinceCode: "",
            deliveryDate: "",
            wardCode: "",
            note: ""
        }
    });
    const { cartItems, totalPrice, dispatch } = useCart();

    const [provinces, setProvinces] = useState<Province[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [loadingWards, setLoadingWards] = useState(false);
    const [loadingProvinces, setLoadingProvinces] = useState(false);

    const [success, SetSuccess] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const provinceCode = useWatch({ control, name: "provinceCode" });
    const wardCode = useWatch({ control, name: "wardCode" });

    useEffect(() => {
        const fetch = async () => {
            try {
                setLoadingProvinces(true);
                const data = await getProvinces();
                setProvinces(data);
            } catch (error) {
                setLoadingProvinces(false)
            }
        }
        fetch();
    })

    useEffect(() => {
        const fetch = async () => {
            if (!provinceCode) {
                setWards([]);
                return;
            }
            try {
                setLoadingWards(true);
                const data = await getWardsByProvince(provinceCode);
                setWards(data || []);
            } catch (erro) {
                setWards([]);
            } finally {
                setLoadingWards(false);
            }
        }
    }, [provinceCode]);

    useEffect(() => {
        resetField("waring");
    }, [provinceCode, resetField]);

    const selectProvince = provinces.find((p) => String(p.code) === String(provinceCode));
    const selectWard = wards.find((w) => String(w.code) === String(wardCode));
    // Submit
    const onSubmit = async (formData: CheckoutFormData) => {
        if (cartItems.length === 0) {
            setSubmitError("Your cart is empty");
            return;
        }
        try {
            setSubmitting(true);
            setSubmitError("");
            const payLoad: CreateOrderPayLoad = {
                products: cartItems.map((item) => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price,
                })),
                formData,
            };
            await createOrder(payLoad);
            SetSuccess(true);
            dispatch({ type: "CLEAR_CART" });
            reset();
        } catch (error) {
            setSubmitError("Cannot place order now. Please try again");
        } finally {
            setSubmitting(false);
        }
    }

    if (cartItems.length === 0) {
        return <EmptyState message="No Items in cart. Add products before checkout" showBackHome />;
    }

    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
            <Box>
                <BackButton />
            </Box>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper sx={{ p: 3, borderRadiusL: 3 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700 }}>
                            Check out
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Full name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <TextField fullWidth label="Phone" {...register("phone")} error={!!errors.phone} helperText={errors.phone?.message} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        control={control}
                                        name="provinceCode"
                                        render={({ field }) => (
                                            <FormControl fullWidth error={!!errors.provinceCode}>
                                                <InputLabel>Province</InputLabel>
                                                <Select label="Province" {...field}>
                                                    {provinces.map((p) => (
                                                        <MenuItem key={p.code} value={String(p.code)}>
                                                            {p.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                                <Typography variant="caption" color="error">
                                                    {errors.provinceCode?.message}
                                                </Typography>
                                            </FormControl>
                                        )} />
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Controller
                                        control={control}
                                        name="wardCode"
                                        render={({ field }) => (
                                            <FormControl fullWidth disabled={!provinceCode || loadingWards} error={!!errors.wardCode}>
                                                <InputLabel>Ward</InputLabel>
                                                <Select label="Ward" {...field}>
                                                    {provinces.map((w) => (
                                                        <MenuItem key={w} value={String(w.code)}>
                                                            {w.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>

                                                <Typography variant="caption" color="error">
                                                    {errors.provinceCode?.message}
                                                </Typography>
                                            </FormControl>
                                        )} />
                                </Grid>


                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CheckoutPage;

