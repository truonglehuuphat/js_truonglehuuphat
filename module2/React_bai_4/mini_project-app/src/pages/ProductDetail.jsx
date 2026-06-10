import { useParams } from "react-router-dom";
import {products} from "../assets/products"

const ProductDetail = () => {
    const value = useParams();
    // console.log(value);
    const findProduct = products.find((item) => String(item.id) === value.id)
    // console.log(findProduct);
    return <div>
        <h1>Thong tin chi tiet san pham </h1>
        <div style={{
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px'
        }}>
            <p>Id san pham: {value.id}</p>
            <p>Ten san pham: {findProduct?.name}</p>
            <p>Gia san pham: {findProduct?.price}</p>
        </div>

    </div>
}


export default ProductDetail;