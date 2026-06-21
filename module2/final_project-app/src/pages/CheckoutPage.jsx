import { useNavigate} from "react-router-dom"; 
import {useForm} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {checkoutSchema } from "../schemas/checkoutSchema"
import { TextField, Button, Container } from "@mui/material";


const CheckoutPage = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: {errors}, } = useForm({
        mode: onchange,
        resolver: yupResolver(checkoutSchema)
    });

    const onSubmit = (data) => {
        console.log("Data: ", data);
    }
    
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{textAlign:'left'}}>
                <p><b>Ho ten</b><span style={{color:"red"}}>*</span></p>
                <TextField  type="text" {...register("username")} style={{borderRadius: 5, width:'350px'}} label="Nguyen Van A"/>
            </div>
            {errors.username && <p style={{color:'red'}}>{errors.username?.message}</p>}
            <div style={{textAlign:'left'}}>
                <p ><b>Email</b><span style={{color:"red"}}>*</span></p>
                <TextField  type="text" {...register("email")} style={{borderRadius: 5, width:'350px'}} label="nguyenvana@gmail.com"/>
            </div>
            {errors.email && <p style={{color:'red'}}>{errors.email?.message}</p>}
            <div style={{textAlign:'left'}}>
                <p ><b>Phone</b><span style={{color:"red"}}>*</span></p>
                <TextField  type="text" {...register("phone")} style={{borderRadius: 5, width:'350px'}} label="0981234567"/>
            </div>
            {errors.phone && <p style={{color:'red'}}>{errors.phone?.message}</p>}
            <div style={{textAlign:'left'}}>
                <p><b>Province/City</b><span style={{color:"red"}}>*</span></p>
                <TextField  type="text" {...register("provinceCity")} style={{borderRadius: 5, width:'350px'}} label="HCM"/>
            </div>
            {errors.provinceCity && <p style={{color:'red'}}>{errors.provinceCity?.message}</p>}
            <div style={{textAlign:'left'}}>
                <p><b>Address</b><span style={{color:"red"}}>*</span></p>
                <TextField  type="text" {...register("address")} style={{borderRadius: 5, width:'350px'}} label="1 vo van ngan"/>
            </div>
            {errors.address && <p style={{color:'red'}}>{errors.address?.message}</p>}
            <div style={{textAlign:'left'}}>
                <p><b>Delivery Date</b><span style={{color:"red"}}>*</span></p>
                <TextField  type="Date" {...register("deliverydate")} style={{borderRadius: 5, width:'350px'}} />
            </div>
            {errors.deliverydate && <p style={{color:'red'}}>{errors.deliverydate?.message}</p>}
            <div style={{textAlign:'left'}}>
                <p><b>Note</b></p>
                <TextField  type="textarea" {...register("Note")} style={{borderRadius: 5, width:'350px', height:'100px'}}/>
            </div>
            {errors.Note && <p style={{color:'red'}}>{errors.Note?.message}</p>}
            <div style={{textAlign:'left'}}>
                <Button type="submit" style={{backgroundColor: "blue", color:'white', borderRadius: 5, width:'350px'}}>Place Order</Button>
            </div>
        </form>
    )
} 
export default CheckoutPage;