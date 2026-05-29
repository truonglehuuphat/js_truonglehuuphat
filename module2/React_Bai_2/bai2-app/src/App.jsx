import { useState } from "react"
import './index.css'

function App(){
  const[phoneNumber, setPhoneNumber] = useState("");
  const[password, setPassword] = useState("");
  const handleInputPhoneNumber = (e) => {
      setPhoneNumber(e.target.value);
  }
  const isErrorPhoneNumber = (phoneNumber.length !== 10 && phoneNumber.length !== 11) && phoneNumber.length > 0;

  const handleInputPassword = (e1) => {
    const value = e1.target.value;
    const num = Number(value);
    if(!isNaN(num) && value.trim() !== ""){
      setPassword(value);
    }
  } 
  
  const isErrorPassword = (password.length <= 8) && password.length > 0;

  const handleSumit = () =>{
    if(isErrorPhoneNumber === false && isErrorPassword === false){
      return;
    }

    if(phoneNumber.length == 0 || password.length == 0){
      return;
    }

    console.log("phoneNumber: ", phoneNumber, " password: ", password);
  }

  return(
    <>
      <input placeholder="Số điện thọai" onChange={handleInputPhoneNumber}/>
        <div style={{   color:"red" }}>
          {
            (isErrorPhoneNumber) ? <p>So dien thoai chi chua so So dien thoai phai co 10  hoac 11 ky tu </p> : null
          }
        </div>
      <input placeholder="Password" onChange={handleInputPassword}/>
        <div style={{ color:"red" }}>
        {
          (isErrorPassword) ? <p>Mat khau lon hon 10 ky tu </p> : null
        }          
        </div>

      <button onClick={handleSumit}>Đăng nhập</button>
    </>
  );
}
export default App