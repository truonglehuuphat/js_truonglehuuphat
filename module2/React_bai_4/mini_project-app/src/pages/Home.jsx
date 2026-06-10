import {products} from "../assets/products"


const ProductCard = ({product}) => {

    return( <div className = "product-card"> 
        <div style={{
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px'
        }}>
            <h3>{product.name}</h3>
            <p>{product.price.toLocaleString()}đ</p>
        </div>
    </div>
    )
};

const Home = () => {
    return <div>
            <h1>Thong tin chi tiet Home</h1>
            <div style={{
                display: 'flex',
                gap: '20px' ,
                border: '1px solid #ccc',
                margin: '10px',
                padding: '10px',
                borderRadius: '8px',
                justifyContent: 'center',
                textAlign:"center"
            }}>
               {
                products.map( (item) => ( <ProductCard product={item} />))
               } 
            </div>
    </div>
}


export default Home;