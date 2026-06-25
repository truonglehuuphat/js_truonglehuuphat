import {Link, useNavigate} from "react-router-dom"

const CartPage = () => {
    const navigate = useNavigate();

    return (
        <div style={{maxWidth:800, margin: "40px auto", padding: "0 16px" }}>
            <button onClick={()=> navigate(-1)} style={{marginBottom: 16}}> quay lai</button>
            <h2>Gio hang</h2>
            <p>waiting lesson 8</p>
            <Link to="/checkout" >
                <button>
                    Tien hanh thanh toan
                </button>
            </Link>
        </div>
    )
};

export default CartPage;
