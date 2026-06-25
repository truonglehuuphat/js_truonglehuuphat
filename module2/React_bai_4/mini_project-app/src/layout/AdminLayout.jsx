import Sidebar from "../component/Sidebar"
import Navbar from "../component/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../component/Footer";

const AdminLayout = () =>{
    return <div  style={{
                display: 'flex',
                borderRadius: '8px',
                justifyContent: 'left',
            }}>
        <div style={{
            border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            borderRadius: '8px'
        }}><Sidebar /></div>
        <div style={{
            // border: '1px solid #ccc',
            margin: '10px',
            padding: '10px',
            // borderRadius: '8px'
        }}><Outlet /></div>
        
    </div>
}

export default AdminLayout