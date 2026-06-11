import { useNavigate, useParams } from "react-router-dom"; 
import { products } from "../data/products";

const ProductDetailPage = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const productCurrent = products.find((item) => Number(item.id) === Number(id));
    console.log("productCurrent " + productCurrent);
    if(!productCurrent){
        return <div style={{ padding: '20px' }}>
                <button onClick={() => navigate(-1)}>Back</button>
                <p>Không tìm thấy sản phẩm này!</p>
            </div> 
    }
    return <div>
        <button onClick={()=> navigate(-1)}>Back</button>
        <h1>Chi tiet san pham {id}</h1>
        <img src={productCurrent.image} alt={productCurrent.name} width={200} style={{borderRadius: 4}}/>
        <p>{productCurrent.name}</p>
        <p>{productCurrent.price}</p>
        <p>{productCurrent.description}</p>
    </div>
        

}

export default ProductDetailPage;