import { Container, Box, Grid } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../components/common/Loading";
import EmptyState from "../components/common/EmptyState";
import BackButton from "../components/common/BackButton";
import ProductInfo from "../components/product/ProductInfo";

import { getProductById } from "../services/productService";
import type { Product } from "../types";

const ProductDetailPage = () => {
    const { id } = useParams();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setError("")
                const data = await getProductById(Number(id));
                console.log(data);
                setProduct(data);
            }
            catch (e) {
                console.log(e);
                setError("Khong ket noi duoc server");
            }
            finally {
                setLoading(false);
            }
        }
        fetchProduct();
    }, [id])
    if (loading) {
        return <Loading />;
    }

    if (error !== "" || product === null) {
        return <EmptyState message={error || "Không tìm thấy sản phẩm"} />
    }
    return (
        <Container maxWidth="lg" sx={{ py: { xs: 2.5, md: 5 } }}>
            <Box sx={{ mb: 2.5 }}>
                <BackButton />
            </Box>
            <Grid container spacing={{ xs: 2.5, md: 5 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            backgroundColor: "background.paper",
                            borderRadius: 3,
                            p: { xs: 2.5, md: 4 },
                            border: "1px solid",
                            borderColor: "divider",
                        }}
                    >
                        <img src={product.thumbnail} alt={product.title} style={{ width: "100%", objectFit: "contain" }} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <ProductInfo product={product} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ProductDetailPage;
