import AdminDashboard from "../pages/AdminDashboard";
import { Outlet, Link  } from "react-router-dom";
// import * as FaICons from 'react-icon/fa'

const Sidebar = () => {
    return <div style={{marginRight:'32', backgroundColor:'back'}}>
        <aside>
            <h1>Store Admin</h1> 
        </aside>
    </div>
}
export default Sidebar;