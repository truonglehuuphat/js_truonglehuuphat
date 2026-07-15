import { Box, Container, Grid } from "@mui/material";
import BackButton from "../components/common/BackButton";
import type { CheckoutFormData } from "../schemas/checkoutSchema";
import { getProvinces, getWardsByProvince } from "../services/locationService";
import type { Province } from "../types/location";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartProvider";
import type { Ward } from "../types/checkout";

const CheckoutPage = () => {
    const { register, control, handleSubmit, formState: { error }, reset, resetField } = useForm<CheckoutFormData>({
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
    })
    useEffect(() => {
        resetField("waring");
    }, [provinceCode, resetField]);
    const selectProvince = provinces.find((p) => String(p.code) === String(provinceCode));
    const selectWard = wards.find((w) => String(w.code) === String(wardCode));
    
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 4 } }}>
            <Box>
                <BackButton />
            </Box>
            <Grid container spacing={3}>

            </Grid>
        </Container>
    )
}

export default CheckoutPage;

function useForm<T>(arg0: {}) {
    throw new Error("Function not implemented.");
}
function yupResolver(checkoutSchema: any) {
    throw new Error("Function not implemented.");
}

function useWatch(arg0: { control: any; name: string; }) {
    throw new Error("Function not implemented.");
}

