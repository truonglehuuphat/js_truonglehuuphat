

const ProductCard = (props) => {
  console.log("props:", props);
  return (
    <>
      <div className="product-card">
        <div className="product-image-wrapper">
            <h1 className="product-name">Tên sản phẩm {props.name}</h1>
            <p className="product-price">Giá {props.price}k</p>
            <img src={props.image} className="product-image"/>
        </div>
      </div>
    </>
  );
}

export default ProductCard