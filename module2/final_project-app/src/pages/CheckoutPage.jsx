import { Form, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "../schemas/checkoutSchema"
import { Select, TextField, Button, Container, Box, Typography, Grid } from "@mui/material";
import { getProvinces, getProvincesWard } from "../sevices/locationService";
import { useEffect, useState } from "react";
import { createOrder } from "../sevices/orderService";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        mode: onchange,
        resolver: yupResolver(checkoutSchema)
    });

    const [provinces, setProvinces] = useState([]);
    const [loadingProvince, setLoadingProvince] = useState(false);
    const [loadingProvinceWard, setLoadingProvinceWard] = useState(false);
    const [provinceWards, setProvinceWards] = useState([]);
    const [listWardsOnProvince, setListWardsOnProvince] = useState([]);

    useEffect(() => {
        const fetchProvices = async () => {
            try {
                setLoadingProvince(true);
                const data = await getProvinces();
                // console.log(data)
                setProvinces(data);
            } catch {
                setProvinces([]);
            } finally {
                setLoadingProvince(false);
            }
        }
        fetchProvices();
    }, []);

    useEffect(() => {
        const fetchProvicesWard = async () => {
            try {
                setLoadingProvinceWard(true);
                const data = await getProvincesWard();
                // console.log(data.data)
                setProvinceWards(data.data);
            } catch {
                setProvinceWards([]);
            } finally {
                setLoadingProvinceWard(false);
            }
        }
        fetchProvicesWard();
    }, []);

    const handleProvinceChange = (provinceCode) => {

        const filteredWards = provinceWards?.filter((ward) => {
            const isSameProvince = Number(ward.province_code) === Number(provinceCode);
            // Kiểm tra codename có tồn tại và chứa từ "phuong" hay không
            const isPhuong = ward.codename?.toLowerCase().includes("phuong");
            return isSameProvince && isPhuong;
        });
        setListWardsOnProvince(filteredWards);
    }

    const onSubmit = async (data) => {
        try {
            setSubmitting(true);
            setSubmitError("");
            await createOrder({
                ...FormData,
                shippingProvince: selectedProvince?.name || ""
            });
            setSuccess(true);
            reset();
        }
        catch {
            setSubmiteError("Cannot place order now. please try again.");
        } finally {
            setSubmitting(false);
        }
    }



    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Container spacing={2} >
                <Grid container spacing={3}>
                    <Grid size={8}>
                        <Box style={{ textAlign: 'left' }}>
                            <Typography><b>Họ và Tên</b><span style={{ color: "red" }}>*</span></Typography>
                            <TextField type="text" {...register("username")} style={{ borderRadius: 5, width: '350px' }} label="Nguyen Van A" />
                        </Box>
                        {errors.username && <p style={{ color: 'red' }}>{errors.username?.message}</p>}
                        <Box style={{ textAlign: 'left' }}>
                            <Typography><b>Email</b><span style={{ color: "red" }}>*</span></Typography>
                            <TextField type="text" {...register("email")} style={{ borderRadius: 5, width: '350px' }} label="nguyenvana@gmail.com" />
                        </Box>
                        {errors.email && <p style={{ color: 'red' }}>{errors.email?.message}</p>}
                        <Box style={{ textAlign: 'left' }} >
                            <Typography><b>Phone</b><span style={{ color: "red" }}>*</span></Typography>
                            <TextField type="text" {...register("phone")} style={{ borderRadius: 5, width: '350px' }} label="0981234567" />
                        </Box>
                        {errors.phone && <p style={{ color: 'red' }}>{errors.phone?.message}</p>}
                    </Grid>
                    <Grid size={4}>
                        <Box style={{ textAlign: 'left' }}>
                            <Typography><b>City</b><span style={{ color: "red" }}>*</span></Typography>
                            {/* <TextField  type="text" {...register("provinceCity")} style={{borderRadius: 5, width:'350px'}} label="Province"/> */}
                            <Select labelId="province-select-label" id="province-select" style={{ borderRadius: 5, width: '350px' }}
                                onChange={(e) => handleProvinceChange(e.target.value)}
                            >
                                {provinces?.map((province) => (
                                    < MenuItem value={province.code}> {province.name}</MenuItem>
                                ))}
                            </Select>
                        </Box>
                        {errors.provinceCity && <p style={{ color: 'red' }}>{errors.provinceCity?.message}</p>}
                        <Box style={{ textAlign: 'left' }}>
                            <Typography><b>Ward</b><span style={{ color: "red" }}>*</span></Typography>
                            {/* <TextField type="text" {...register("phone")} style={{ borderRadius: 5, width: '350px' }} label="0981234567" /> */}
                            <Select labelId="listWardsOnProvince-select-label" id="listWardsOnProvince-select" style={{ borderRadius: 5, width: '350px' }} >
                                {
                                    listWardsOnProvince?.map((wards) => (
                                        <MenuItem value={wards.code} >{wards.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Box>
                        {errors.address && <p style={{ color: 'red' }}>{errors.address?.message}</p>}
                        <Box style={{ textAlign: 'left' }}>
                            <Typography><b>Address</b><span style={{ color: "red" }}>*</span></Typography>
                            <TextField type="text" {...register("address")} style={{ borderRadius: 5, width: '350px' }} label="Địa chỉ cụ thể" />
                        </Box>
                        {errors.address && <p style={{ color: 'red' }}>{errors.address?.message}</p>}
                    </Grid>
                    <Grid>
                        <Button variant="contained">Submit</Button>
                    </Grid>
                </Grid>

            </Container>
        </Form>
    )
}
export default CheckoutPage;